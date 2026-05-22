// backend/src/routes/documents.js
const express = require('express');
const multer = require('multer');
const { Storage } = require('@google-cloud/storage');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const prisma = require('../lib/prisma');
const { enqueueDocumentAnalysis } = require('../workers/documentWorker');

const router = express.Router({ mergeParams: true }); // mergeParams to access :loanId


// Google Cloud Storage configuration
// Authenticates via GOOGLE_APPLICATION_CREDENTIALS env var (path to service account JSON)
// or automatically when running on GCP (Compute Engine, Cloud Run, GKE)
const gcs = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  // Only needed locally — on GCP, ADC (Application Default Credentials) handles auth automatically
  ...(process.env.GOOGLE_APPLICATION_CREDENTIALS
    ? { keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS }
    : {})
});

const bucket = gcs.bucket(process.env.GCS_BUCKET_NAME);

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB per document

// Maps multer field names → Prisma DocumentType enum values
const FIELD_TO_DOC_TYPE = {
  aadhaar: 'AADHAAR',
  pan: 'PAN',
  itr: 'ITR',
  employmentLetter: 'EMPLOYMENT_LETTER'
};

// Custom GCS multer storage engine
// multer-s3 doesn't support GCS, so we buffer in memory then stream to GCS
const gcsStorage = multer.memoryStorage();

const upload = multer({
  storage: gcsStorage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: (req, file, cb) => {
    if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid file type: ${file.mimetype}. Only JPEG, PNG, WebP, PDF allowed.`));
    }
  }
});

// Helper: upload a single buffer to GCS and return the public URL + GCS path
async function uploadToGCS(fileBuffer, destPath, mimeType, metadata = {}) {
  const gcsFile = bucket.file(destPath);

  await gcsFile.save(fileBuffer, {
    metadata: {
      contentType: mimeType,
      metadata // custom metadata (loanId, fieldName, etc.)
    },
    resumable: false // Fine for files < 5MB; set true for larger uploads
  });

  // Return the GCS URI (used internally for analysis) and the public HTTPS URL
  const gcsUri = `gs://${process.env.GCS_BUCKET_NAME}/${destPath}`;
  const publicUrl = `https://storage.googleapis.com/${process.env.GCS_BUCKET_NAME}/${destPath}`;

  return { gcsUri, publicUrl, gcsPath: destPath };
}

// POST /api/loans/:loanId/documents
// Upload Aadhaar, ITR, employment letter for a loan application
router.post('/',
  upload.fields([
    { name: 'aadhaar', maxCount: 1 },
    { name: 'pan', maxCount: 1 },
    { name: 'itr', maxCount: 2 },
    { name: 'employmentLetter', maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      const { loanId } = req.params;
      const officerId = req.headers['x-officer-id'] || 'system';

      // Verify loan exists and is in a state that accepts documents
      const loan = await prisma.loanApplication.findUnique({ where: { id: loanId } });
      if (!loan) return res.status(404).json({ error: 'Loan application not found' });
      if (loan.analysisStatus === 'PROCESSING') {
        return res.status(409).json({ error: 'Analysis already in progress for this loan' });
      }

      const uploadedFiles = req.files;
      if (!uploadedFiles || Object.keys(uploadedFiles).length === 0) {
        return res.status(400).json({ error: 'No documents uploaded' });
      }

      // Build document paths map for analysis service
      const documentPaths = {};
      const savedDocuments = [];

      // Upload all files to GCS in parallel
      const uploadPromises = Object.entries(uploadedFiles).map(async ([docType, files]) => {
        const file = files[0]; // Take first file for each type
        const ext = path.extname(file.originalname);
        const gcsPath = `loans/${loanId}/documents/${docType}/${uuidv4()}${ext}`;

        const { gcsUri, publicUrl } = await uploadToGCS(
          file.buffer,
          gcsPath,
          file.mimetype,
          { fieldName: docType, loanId, uploadedBy: officerId }
        );

        // documentAnalysisService uses the GCS URI (gs://...) for Vision API
        // which can read GCS objects directly — no need for signed URLs
        documentPaths[docType] = gcsUri;

        // Save document record to DB
        const doc = await prisma.document.create({
          data: {
            loanApplicationId: loanId,
            type: FIELD_TO_DOC_TYPE[docType] || docType.toUpperCase(),
            s3Key: gcsPath,       // reusing field — stores GCS object path
            s3Url: publicUrl,     // reusing field — stores GCS public URL
            originalFilename: file.originalname,
            mimeType: file.mimetype,
            sizeBytes: file.size,
            uploadedBy: officerId
          }
        });
        savedDocuments.push(doc);
      });

      await Promise.all(uploadPromises);

      // Update loan status
      await prisma.loanApplication.update({
        where: { id: loanId },
        data: { analysisStatus: 'QUEUED', documentsUploadedAt: new Date() }
      });

      // Enqueue async analysis job — returns immediately
      const jobId = await enqueueDocumentAnalysis(loanId, documentPaths, officerId);

      res.status(202).json({
        success: true,
        message: 'Documents uploaded. AI analysis started.',
        loanId,
        jobId,
        documentsReceived: Object.keys(uploadedFiles),
        estimatedProcessingTimeSeconds: 25,
        websocketEvent: `loan:${loanId}` // Client subscribes to this for real-time updates
      });

    } catch (error) {
      console.error('Document upload error:', error);
      res.status(500).json({ error: error.message });
    }
  }
);

// Maps the Prisma DocumentType enum back to the frontend's lowercase keys
const DOC_TYPE_TO_FIELD = {
  AADHAAR: 'aadhaar',
  PAN: 'pan',
  ITR: 'itr',
  EMPLOYMENT_LETTER: 'employmentLetter',
};

// GET /api/loans/:loanId/documents/analysis
// Get the latest analysis result for a loan
router.get('/analysis', async (req, res) => {
  try {
    const { loanId } = req.params;

    const loan = await prisma.loanApplication.findUnique({
      where: { id: loanId },
      include: {
        documents: true,
        analysis: { orderBy: { analyzedAt: 'desc' }, take: 1 },
        fraudFlags: true
      }
    });

    if (!loan) return res.status(404).json({ error: 'Loan not found' });

    res.json({
      loanId,
      status: loan.analysisStatus,
      riskScore: loan.currentRiskScore,
      recommendation: loan.recommendation,
      analysis: loan.analysis[0] || null,
      fraudFlags: loan.fraudFlags,
      documents: loan.documents.map(d => ({
        id: d.id,
        type: d.type,
        fieldKey: DOC_TYPE_TO_FIELD[d.type] || d.type.toLowerCase(),
        originalFilename: d.originalFilename,
        mimeType: d.mimeType,
        sizeBytes: d.sizeBytes,
        uploadedAt: d.createdAt,
        analysisStatus: d.analysisStatus,
        // Proxied through the backend so it works for both real GCS and fake-gcs
        fileUrl: `/api/loans/${loanId}/documents/${d.id}/file`,
      }))
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/loans/:loanId/documents/:docId/file
// Streams the original document binary from GCS — used by the UI to render
// thumbnails/PDF previews without exposing GCS credentials to the browser.
router.get('/:docId/file', async (req, res) => {
  try {
    const { loanId, docId } = req.params;

    const doc = await prisma.document.findFirst({
      where: { id: docId, loanApplicationId: loanId },
    });
    if (!doc) return res.status(404).json({ error: 'Document not found' });

    const gcsFile = bucket.file(doc.s3Key);
    const [exists] = await gcsFile.exists();
    if (!exists) return res.status(404).json({ error: 'File missing from storage' });

    res.setHeader('Content-Type', doc.mimeType);
    res.setHeader('Content-Disposition', `inline; filename="${doc.originalFilename}"`);
    res.setHeader('Cache-Control', 'private, max-age=300');
    // Explicitly mark as embeddable from any origin so the frontend <img>
    // tag on a different port can render the thumbnail.
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');

    gcsFile.createReadStream()
      .on('error', (err) => {
        console.error('GCS stream error:', err);
        if (!res.headersSent) res.status(500).json({ error: 'Stream failed' });
      })
      .pipe(res);
  } catch (error) {
    console.error('Document file fetch error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;