// backend/src/services/documentAnalysisService.js
// Core analysis service — uses AI provider (Claude or Gemini) to extract and verify loan documents,
// combined with deterministic forensic checks (Aadhaar QR, EXIF, PAN structure).

// Node v24 compatibility: Use sharp if available, fallback to null
let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  sharp = null;
  console.warn('⚠️  sharp not available - image preprocessing will be skipped');
}

const aiProvider = require('./ai');

const { loadDocument, isImage, isPdf } = require('./verifiers/fileLoader');
const { verifyAadhaarQR } = require('./verifiers/aadhaarQR');
const { analyzeExif } = require('./verifiers/exifAnalyzer');
const { validatePANFormat, checkPANSurnameMatch, crossCheckPanAadhaar } = require('./verifiers/panValidator');
const { detectDocumentTampering } = require('./tamperingDetector');

// ─────────────────────────────────────────────
// IMAGE PRE-PROCESSING — Improves OCR accuracy 15-30%
// Operates on Buffer input (downloaded from GCS by fileLoader)
// ─────────────────────────────────────────────

async function preprocessImageBuffer(imageBuffer) {
  if (!sharp) {
    // If sharp is not available, return base64 of original buffer
    console.warn('⚠️  Sharp unavailable - skipping image preprocessing');
    return imageBuffer.toString('base64');
  }

  const processed = await sharp(imageBuffer)
    .resize(2048, null, { withoutEnlargement: false, fit: 'inside' })
    .normalize()
    .sharpen({ sigma: 1.5 })
    .jpeg({ quality: 95 })
    .toBuffer();
  return processed.toString('base64');
}

// ─────────────────────────────────────────────
// SINGLE DOCUMENT ANALYSIS
// Uses configured AI provider (Claude or Gemini)
// ─────────────────────────────────────────────

async function analyzeDocument({ buffer, mimeType }, documentType) {
  // Preprocess images for better OCR accuracy
  let bufferToAnalyze = buffer;
  if (isImage(mimeType)) {
    const base64Preprocessed = await preprocessImageBuffer(buffer);
    // Convert base64 back to Buffer for the AI provider
    bufferToAnalyze = Buffer.from(base64Preprocessed, 'base64');
  }

  // Delegate to configured AI provider (Claude or Gemini)
  return aiProvider.extractDocument(bufferToAnalyze, mimeType, documentType);
}

// ─────────────────────────────────────────────
// CROSS-DOCUMENT VALIDATION
// Checks consistency across all submitted docs
// ─────────────────────────────────────────────

async function crossValidateDocuments(docs) {
  const { aadhaar, pan, itr, employmentLetter } = docs;
  const checks = [];

  // 1. Name consistency across all documents
  const names = [
    aadhaar?.extracted?.name,
    pan?.extracted?.name,
    itr?.extracted?.name,
    employmentLetter?.extracted?.employeeName
  ].filter(Boolean);

  if (names.length >= 2) {
    const nameMatch = checkNameSimilarity(names);
    checks.push({
      check: 'NAME_MATCH',
      pass: nameMatch.score > 0.85,
      detail: nameMatch.score > 0.85
        ? `Names consistent across ${names.length} documents`
        : `Name mismatch: ${names.join(' | ')}`,
      score: nameMatch.score
    });
  }

  // 2. Income consistency: ITR vs Employment Letter
  if (itr?.extracted?.annualIncome && employmentLetter?.extracted?.monthlySalary) {
    const itrAnnual = itr.extracted.annualIncome;
    const salaryAnnual = employmentLetter.extracted.monthlySalary * 12;
    const ratio = salaryAnnual / itrAnnual;

    checks.push({
      check: 'INCOME_CONSISTENCY',
      pass: ratio >= 0.8 && ratio <= 1.3,
      detail: ratio >= 0.8 && ratio <= 1.3
        ? `Income consistent (ITR: ₹${formatInr(itrAnnual)}, Salary: ₹${formatInr(salaryAnnual)}/yr)`
        : `MISMATCH: Salary ₹${formatInr(salaryAnnual)}/yr vs ITR ₹${formatInr(itrAnnual)}/yr (${Math.round(ratio * 100)}%)`,
      ratio: Math.round(ratio * 100) / 100
    });
  }

  // 3. PAN structural validity (PAN card itself, then ITR-PAN as fallback)
  const panString = pan?.extracted?.pan || itr?.extracted?.pan;
  if (panString) {
    const panCheck = validatePANFormat(panString);
    checks.push({
      check: 'PAN_FORMAT_VALID',
      pass: panCheck.valid,
      detail: panCheck.valid
        ? `PAN ${panCheck.pan} format valid (${panCheck.entityType})`
        : `Invalid PAN format: ${panString} — ${panCheck.flags.join(', ')}`
    });

    // 3b. PAN surname-initial rule (4th letter = entity, 5th = first letter of surname for individuals)
    if (panCheck.valid && pan?.extracted?.name) {
      const surnameCheck = checkPANSurnameMatch(panCheck.pan, pan.extracted.name);
      if (surnameCheck.match !== null) {
        checks.push({
          check: 'PAN_SURNAME_RULE',
          pass: surnameCheck.match,
          detail: surnameCheck.detail
        });
      }
    }
  }

  // 4. PAN <-> Aadhaar identity match (name + DOB)
  if (pan?.extracted && aadhaar?.extracted) {
    const panAadhaarChecks = crossCheckPanAadhaar({
      panName: pan.extracted.name,
      panDob: pan.extracted.dob,
      aadhaarName: aadhaar.extracted.name,
      aadhaarDob: aadhaar.extracted.dob
    });
    checks.push(...panAadhaarChecks);
  }

  // 5. Aadhaar QR <-> printed-text consistency (forensic verifier result)
  if (aadhaar?.qrVerification) {
    const qr = aadhaar.qrVerification;
    checks.push({
      check: 'AADHAAR_QR_PRESENT',
      pass: qr.qrFound,
      detail: qr.qrFound
        ? `QR detected (${qr.qrType})`
        : 'No QR code detected on Aadhaar — genuine Aadhaars always carry a UIDAI QR'
    });
    if (qr.qrFound) {
      checks.push({
        check: 'AADHAAR_QR_MATCHES_PRINT',
        pass: qr.crossCheck.mismatches.length === 0,
        detail: qr.crossCheck.mismatches.length === 0
          ? 'QR-embedded data matches printed/OCR fields'
          : `QR data does NOT match printed fields: ${qr.crossCheck.mismatches.join(', ')} — strong tampering indicator`
      });
    }
  }

  // 6. GST number validation for employer
  if (employmentLetter?.extracted?.gstNumber) {
    const gst = employmentLetter.extracted.gstNumber;
    const gstValid = /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/.test(gst);
    checks.push({
      check: 'EMPLOYER_GST_VALID',
      pass: gstValid,
      detail: gstValid ? `GST ${gst} format valid` : `Invalid/suspicious GST: ${gst}`
    });
  }

  // 7. Document age — employment letter should be recent (< 3 months)
  if (employmentLetter?.extracted?.issueDate) {
    const issueDate = parseIndianDate(employmentLetter.extracted.issueDate);
    if (issueDate) {
      const ageMonths = (Date.now() - issueDate) / (1000 * 60 * 60 * 24 * 30);
      checks.push({
        check: 'EMPLOYMENT_LETTER_RECENT',
        pass: ageMonths <= 3,
        detail: ageMonths <= 3
          ? `Letter dated ${employmentLetter.extracted.issueDate} (${Math.round(ageMonths)} months old)`
          : `Letter is ${Math.round(ageMonths)} months old — may be stale`
      });
    }
  }

  return checks;
}

// ─────────────────────────────────────────────
// RISK SCORE CALCULATION
// Weighted model combining all signals
// ─────────────────────────────────────────────

function calculateRiskScore(documentResults, crossChecks) {
  let score = 0;
  const factors = [];

  // Weights per document — Aadhaar carries the most weight as the identity anchor
  const docTypes = ['aadhaar', 'pan', 'itr', 'employmentLetter'];
  const weights = { aadhaar: 25, pan: 20, itr: 18, employmentLetter: 12 };

  docTypes.forEach(type => {
    const doc = documentResults[type];
    if (!doc) return;

    // Fail-closed: an unanalyzable document is treated as suspicious, not "approved by default"
    if (doc.error || !doc.analysis) {
      const penalty = weights[type] || 10;
      score += penalty;
      factors.push({
        source: type,
        error: doc.error || 'Document could not be analyzed',
        flags: ['DOCUMENT_UNREADABLE'],
        contribution: penalty
      });
      return;
    }

    const authenticity = doc.analysis.authenticityScore ?? 1;
    const penaltyPoints = weights[type] * (1 - authenticity);
    score += penaltyPoints;

    // Only count high-severity forgery flags. NO_EXIF_METADATA is benign (common in re-saves/screenshots).
    const allFlags = doc.analysis.forgeryFlags || [];
    const benignFlags = ['NO_EXIF_METADATA', 'METADATA_MISMATCH'];
    const severeFlags = allFlags.filter(f => !benignFlags.includes(f));
    const flagCount = severeFlags.length;
    score += flagCount * 3;

    // EXIF tampering signals layered on top of AI's visual assessment
    // NO_EXIF_METADATA itself is benign; penalize only specific edit signatures like PHOTOSHOP, GIMP, etc.
    const exifAllFlags = doc.exifAnalysis?.flags || [];
    const exifBenignFlags = ['NO_EXIF_METADATA'];
    const exifSevereFlags = exifAllFlags.filter(f => !exifBenignFlags.includes(f));
    const exifPenalty = exifSevereFlags.length * 4;
    score += exifPenalty;

    factors.push({
      source: type,
      authenticityScore: authenticity,
      flags: allFlags,
      exifFlags: exifAllFlags,
      severeFlags: severeFlags,
      exifSevereFlags: exifSevereFlags,
      contribution: Math.round(penaltyPoints + flagCount * 3 + exifPenalty)
    });
  });

  // Aadhaar QR forensic verification — high-confidence tampering signal
  // NOTE: QR_PRESENT and QR_MATCHES_PRINT are already handled in cross-checks above,
  // so we only penalize the specific case of QR data mismatch here (when QR exists but doesn't match OCR)
  const qr = documentResults.aadhaar?.qrVerification;
  if (qr) {
    if (qr.qrFound && qr.crossCheck.mismatches.length > 0) {
      // Only penalize if QR was found but its data doesn't match the printed/OCR fields
      // (This is a separate issue from "QR missing" which is already in cross-checks)
      score += 30;
      factors.push({
        source: 'aadhaarQR',
        check: 'QR_OCR_MISMATCH',
        mismatches: qr.crossCheck.mismatches,
        penalty: 30
      });
    }
  }

  // Cross-check failures (existing scheme, expanded penalty map)
  crossChecks.forEach(check => {
    if (check.pass === false) {
      const penaltyMap = {
        NAME_MATCH: 15,
        INCOME_CONSISTENCY: 20,
        PAN_FORMAT_VALID: 12,
        PAN_SURNAME_RULE: 8,
        PAN_AADHAAR_NAME_MATCH: 18,
        PAN_AADHAAR_DOB_MATCH: 15,
        AADHAAR_QR_PRESENT: 20,
        AADHAAR_QR_MATCHES_PRINT: 30,
        EMPLOYER_GST_VALID: 12,
        EMPLOYMENT_LETTER_RECENT: 5
      };
      const penalty = penaltyMap[check.check] || 8;
      score += penalty;
      factors.push({ source: 'crossCheck', check: check.check, penalty });
    }
  });

  const finalScore = Math.min(100, Math.round(score));

  return {
    score: finalScore,
    recommendation: finalScore >= 70 ? 'REJECT' : finalScore >= 40 ? 'MANUAL_REVIEW' : 'APPROVE',
    factors,
    riskLevel: finalScore >= 70 ? 'HIGH' : finalScore >= 40 ? 'MEDIUM' : 'LOW'
  };
}

// ─────────────────────────────────────────────
// MASTER ANALYSIS FUNCTION
// Called by the Bull queue worker
// ─────────────────────────────────────────────

async function analyzeAllDocuments(loanId, documentPaths) {
  const startTime = Date.now();
  const results = {};

  console.log(`Starting analysis for loan ${loanId}...`);

  // For each submitted document: download → AI extraction + forensic checks in parallel
  const analysisPromises = Object.entries(documentPaths).map(async ([type, source]) => {
    try {
      console.log(`  [${type}] Loading from ${source}`);
      const loaded = await loadDocument(source);

      // AI extraction (Claude or Gemini, configured via AI_PROVIDER env)
      const aiPromise = analyzeDocument(loaded, type).catch(err => {
        console.error(`  [${type}] AI analysis failed:`, err.message);
        return { error: err.message };
      });

      // EXIF analysis — only for images
      const exifPromise = isImage(loaded.mimeType)
        ? analyzeExif(loaded.buffer).catch(err => ({ flags: ['EXIF_PARSE_FAILED'], error: err.message }))
        : Promise.resolve(null);

      const [aiResult, exifResult] = await Promise.all([aiPromise, exifPromise]);

      // Aadhaar-specific: QR forensic verification (uses OCR output from Claude)
      let qrResult = null;
      if (type === 'aadhaar' && isImage(loaded.mimeType)) {
        try {
          qrResult = await verifyAadhaarQR(loaded.buffer, aiResult?.extracted || {});
        } catch (err) {
          console.error(`  [aadhaar] QR verification failed:`, err.message);
          qrResult = { qrFound: false, flags: ['QR_VERIFICATION_ERROR'], crossCheck: { checks: [], mismatches: [] }, error: err.message };
        }
      }

      // NEW: 10-Point Tampering Detection (Hackathon MVP)
      let tamperingAnalysis = null;
      if (isImage(loaded.mimeType)) {
        try {
          tamperingAnalysis = await detectDocumentTampering(loaded.buffer, type, aiResult || {});
        } catch (err) {
          console.error(`  [${type}] Tampering detection failed:`, err.message);
          tamperingAnalysis = {
            finalTamperingScore: 0,
            decision: 'ERROR',
            error: err.message,
            detectorBreakdown: []
          };
        }
      }

      results[type] = {
        ...aiResult,
        mimeType: loaded.mimeType,
        ...(exifResult !== null && { exifAnalysis: exifResult }),
        ...(qrResult !== null && { qrVerification: qrResult }),
        ...(tamperingAnalysis !== null && { tamperingAnalysis: tamperingAnalysis })
      };
    } catch (err) {
      console.error(`  [${type}] Fatal error:`, err.message);
      results[type] = { error: err.message };
    }
  });

  await Promise.all(analysisPromises);

  const crossChecks = await crossValidateDocuments(results);
  const riskAssessment = calculateRiskScore(results, crossChecks);
  const processingTimeMs = Date.now() - startTime;

  // NEW: Aggregate tampering scores across all documents
  const tamperingAggregation = aggregateTamperingScores(results);

  return {
    loanId,
    processingTimeMs,
    documents: results,
    crossChecks,
    riskAssessment,
    tamperingAggregation,
    analyzedAt: new Date().toISOString()
  };
}

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

function checkNameSimilarity(names) {
  // Simplified Levenshtein-based similarity
  const normalize = (s) => s.toLowerCase().replace(/[^a-z\s]/g, '').trim();
  const normalized = names.map(normalize);

  let minScore = 1;
  for (let i = 0; i < normalized.length - 1; i++) {
    for (let j = i + 1; j < normalized.length; j++) {
      const s = similarity(normalized[i], normalized[j]);
      minScore = Math.min(minScore, s);
    }
  }
  return { score: minScore };
}

function similarity(a, b) {
  const longer = a.length > b.length ? a : b;
  const shorter = a.length > b.length ? b : a;
  if (longer.length === 0) return 1.0;
  return (longer.length - editDistance(longer, shorter)) / longer.length;
}

function editDistance(a, b) {
  const matrix = Array.from({ length: b.length + 1 }, (_, i) =>
    Array.from({ length: a.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      matrix[i][j] = b[i-1] === a[j-1]
        ? matrix[i-1][j-1]
        : Math.min(matrix[i-1][j-1] + 1, matrix[i][j-1] + 1, matrix[i-1][j] + 1);
    }
  }
  return matrix[b.length][a.length];
}

function parseIndianDate(dateStr) {
  if (!dateStr) return null;
  const parts = dateStr.split('/');
  if (parts.length !== 3) return null;
  return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
}

function formatInr(amount) {
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(amount);
}

// ─────────────────────────────────────────────
// NEW: Aggregate Tampering Scores Across All Documents
// ─────────────────────────────────────────────
function aggregateTamperingScores(results) {
  const tamperingResults = {};
  let totalScore = 0;
  let documentCount = 0;

  for (const [type, result] of Object.entries(results)) {
    if (result.tamperingAnalysis) {
      tamperingResults[type] = result.tamperingAnalysis;
      totalScore += result.tamperingAnalysis.finalTamperingScore || 0;
      documentCount++;
    }
  }

  const averageScore = documentCount > 0 ? totalScore / documentCount : 0;
  let overallDecision = 'GENUINE';
  let overallRisk = 'LOW';

  if (averageScore >= 70) {
    overallDecision = 'LIKELY_FORGED';
    overallRisk = 'CRITICAL';
  } else if (averageScore >= 30) {
    overallDecision = 'SUSPICIOUS';
    overallRisk = 'MEDIUM';
  }

  return {
    averageTamperingScore: Math.round(averageScore * 10) / 10,
    overallDecision,
    overallRisk,
    documentResults: tamperingResults,
    documentCount,
    recommendation: overallDecision === 'GENUINE' ? 'APPROVE' :
                   overallDecision === 'SUSPICIOUS' ? 'MANUAL_REVIEW' :
                   'REJECT'
  };
}

module.exports = {
  analyzeAllDocuments,
  analyzeDocument,
  crossValidateDocuments,
  calculateRiskScore,
  aggregateTamperingScores
};
