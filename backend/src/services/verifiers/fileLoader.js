// backend/src/services/verifiers/fileLoader.js
// Loads a document (image or PDF) into memory as a Buffer.
// Handles gs:// URIs, https:// GCS URLs, and local file paths.

const { Storage } = require('@google-cloud/storage');
const fs = require('fs').promises;
const path = require('path');

const gcs = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  ...(process.env.GOOGLE_APPLICATION_CREDENTIALS
    ? { keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS }
    : {})
});

const IMAGE_MIME_PREFIX = 'image/';
const PDF_MIME = 'application/pdf';

// Parse gs://bucket/object-path → { bucket, name }
function parseGcsUri(uri) {
  const match = uri.match(/^gs:\/\/([^/]+)\/(.+)$/);
  if (!match) throw new Error(`Invalid GCS URI: ${uri}`);
  return { bucket: match[1], name: match[2] };
}

// Determine mime type from file extension when GCS metadata is unavailable
function guessMimeFromPath(p) {
  const ext = path.extname(p).toLowerCase();
  if (ext === '.pdf') return PDF_MIME;
  if (ext === '.png') return 'image/png';
  if (ext === '.webp') return 'image/webp';
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
  return 'application/octet-stream';
}

// Load a document into a Buffer + detected mime type.
// Accepts: gs://... URIs (preferred), https://storage.googleapis.com/... URLs, or local paths.
async function loadDocument(source) {
  if (!source) throw new Error('loadDocument: source is required');

  if (source.startsWith('gs://')) {
    const { bucket: bucketName, name } = parseGcsUri(source);
    const file = gcs.bucket(bucketName).file(name);
    const [buffer] = await file.download();
    const [meta] = await file.getMetadata();
    return {
      buffer,
      mimeType: meta.contentType || guessMimeFromPath(name),
      source
    };
  }

  if (source.startsWith('https://storage.googleapis.com/')) {
    // Convert public URL → gs:// URI and retry via SDK (avoids needing public ACLs)
    const stripped = source.replace('https://storage.googleapis.com/', '');
    const [bucketName, ...rest] = stripped.split('/');
    return loadDocument(`gs://${bucketName}/${rest.join('/')}`);
  }

  // Treat as local path (useful for tests and local-dev fixtures)
  const buffer = await fs.readFile(source);
  return { buffer, mimeType: guessMimeFromPath(source), source };
}

function isImage(mimeType) {
  return typeof mimeType === 'string' && mimeType.startsWith(IMAGE_MIME_PREFIX);
}

function isPdf(mimeType) {
  return mimeType === PDF_MIME;
}

module.exports = { loadDocument, isImage, isPdf, PDF_MIME };
