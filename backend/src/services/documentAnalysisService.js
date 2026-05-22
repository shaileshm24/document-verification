// backend/src/services/documentAnalysisService.js
// Core AI service — uses Claude Vision to extract and verify loan documents,
// combined with deterministic forensic checks (Aadhaar QR, EXIF, PAN structure).

const Anthropic = require('@anthropic-ai/sdk');
const sharp = require('sharp');

const { loadDocument, isImage, isPdf } = require('./verifiers/fileLoader');
const { verifyAadhaarQR } = require('./verifiers/aadhaarQR');
const { analyzeExif } = require('./verifiers/exifAnalyzer');
const { validatePANFormat, checkPANSurnameMatch, crossCheckPanAadhaar } = require('./verifiers/panValidator');

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const MODEL = process.env.CLAUDE_MODEL || 'claude-opus-4-6';

// ─────────────────────────────────────────────
// DOCUMENT TYPE PROMPTS
// Tuned for Indian banking documents
// ─────────────────────────────────────────────

const EXTRACTION_PROMPTS = {
  aadhaar: `You are a document verification expert for Indian banking. Analyze this Aadhaar card image.

Extract the following fields as JSON:
{
  "name": "full name as printed",
  "dob": "DD/MM/YYYY",
  "gender": "M/F/T",
  "uid": "XXXX-XXXX-XXXX (last 4 visible digits or full if visible)",
  "address": "full address",
  "pincode": "6-digit pincode",
  "hasQR": true/false,
  "hasPhoto": true/false
}

Then analyze for forgery indicators:
{
  "forgeryFlags": [
    "FONT_INCONSISTENCY" - if text fonts don't match UIDAI standard,
    "QR_SUSPICIOUS" - if QR code appears modified,
    "PHOTO_MANIPULATION" - if photo shows signs of editing,
    "ALIGNMENT_ISSUES" - if text is misaligned,
    "COLOR_INCONSISTENCY" - if colors don't match standard Aadhaar palette,
    "PIXELATION_AROUND_TEXT" - if text has unusual pixelation suggesting copy-paste,
    "METADATA_MISMATCH" - if document metadata seems inconsistent
  ],
  "authenticityScore": 0.0-1.0,
  "confidence": 0.0-1.0,
  "notes": "detailed observations about authenticity"
}

Return ONLY valid JSON with both "extracted" and "analysis" keys.`,

  pan: `You are a document verification expert for Indian banking. Analyze this PAN (Permanent Account Number) card.

Extract:
{
  "pan": "AAAAA9999A — 10-character PAN exactly as printed",
  "name": "cardholder name as printed (line above DOB)",
  "fatherName": "father's name as printed (if visible)",
  "dob": "DD/MM/YYYY",
  "hasPhoto": true/false,
  "hasSignature": true/false,
  "hasHologram": true/false
}

Forgery analysis:
{
  "forgeryFlags": [
    "INCORRECT_PAN_FORMAT" - if PAN is not 10 chars AAAAA9999A,
    "MISSING_HOLOGRAM" - if the IT department hologram is missing or altered,
    "FONT_INCONSISTENCY" - if fonts don't match standard PAN card,
    "PHOTO_MANIPULATION" - if photo shows signs of editing,
    "ALIGNMENT_ISSUES" - if text is misaligned,
    "BACKGROUND_TAMPERING" - if background pattern looks irregular
  ],
  "authenticityScore": 0.0-1.0,
  "confidence": 0.0-1.0,
  "notes": "detailed observations"
}

Return ONLY valid JSON with "extracted" and "analysis" keys.`,

  itr: `You are a financial document expert for Indian banking compliance. Analyze this Income Tax Return (ITR) document.

Extract:
{
  "assessmentYear": "AYXXXX-XX",
  "pan": "XXXXXXXXXX",
  "name": "taxpayer name",
  "annualIncome": number (in INR),
  "taxPaid": number,
  "filingDate": "DD/MM/YYYY",
  "form": "ITR-1/2/3/4",
  "acknowledgementNo": "string"
}

Forgery analysis:
{
  "forgeryFlags": [
    "INCORRECT_PAN_FORMAT",
    "INCOME_SUSPICIOUSLY_ROUND",
    "MISSING_ACKNOWLEDGEMENT",
    "FONT_MISMATCH",
    "INCORRECT_ASSESSMENT_YEAR",
    "COMPUTATION_ERROR"
  ],
  "authenticityScore": 0.0-1.0,
  "confidence": 0.0-1.0,
  "notes": "any observations"
}

Return ONLY valid JSON with "extracted" and "analysis" keys.`,

  employmentLetter: `You are an HR document verification expert. Analyze this employment letter/salary certificate.

Extract:
{
  "employerName": "company name",
  "employerAddress": "address",
  "gstNumber": "if visible",
  "cinNumber": "if visible",
  "employeeName": "employee full name",
  "designation": "job title",
  "monthlySalary": number (in INR),
  "annualCtc": number,
  "joiningDate": "DD/MM/YYYY",
  "issueDate": "DD/MM/YYYY",
  "hrSignatory": "signing authority name/designation",
  "hasCompanyStamp": true/false,
  "hasLetterhead": true/false
}

Forgery analysis:
{
  "forgeryFlags": [
    "GENERIC_TEMPLATE" - matches known forged letter templates,
    "INVALID_GST_FORMAT",
    "NO_COMPANY_STAMP",
    "SALARY_INCONSISTENT_WITH_DESIGNATION",
    "MISSING_LETTERHEAD",
    "SUSPICIOUS_FONT",
    "NO_HR_CONTACT",
    "ROUND_SALARY_FIGURES"
  ],
  "authenticityScore": 0.0-1.0,
  "confidence": 0.0-1.0,
  "notes": "observations"
}

Return ONLY valid JSON with "extracted" and "analysis" keys.`
};

// ─────────────────────────────────────────────
// IMAGE PRE-PROCESSING — Improves OCR accuracy 15-30%
// Operates on Buffer input (downloaded from GCS by fileLoader)
// ─────────────────────────────────────────────

async function preprocessImageBuffer(imageBuffer) {
  const processed = await sharp(imageBuffer)
    .resize(2048, null, { withoutEnlargement: false, fit: 'inside' })
    .normalize()
    .sharpen({ sigma: 1.5 })
    .jpeg({ quality: 95 })
    .toBuffer();
  return processed.toString('base64');
}

// Build the Anthropic content block for a document — images use the image source,
// PDFs use the document source (sharp cannot process PDFs).
async function buildDocumentContent(buffer, mimeType) {
  if (isPdf(mimeType)) {
    return {
      type: 'document',
      source: { type: 'base64', media_type: 'application/pdf', data: buffer.toString('base64') }
    };
  }
  if (isImage(mimeType)) {
    const base64 = await preprocessImageBuffer(buffer);
    return {
      type: 'image',
      source: { type: 'base64', media_type: 'image/jpeg', data: base64 }
    };
  }
  throw new Error(`Unsupported mime type for analysis: ${mimeType}`);
}

// ─────────────────────────────────────────────
// SINGLE DOCUMENT ANALYSIS
// ─────────────────────────────────────────────

async function analyzeDocument({ buffer, mimeType }, documentType) {
  const prompt = EXTRACTION_PROMPTS[documentType];
  if (!prompt) throw new Error(`Unknown document type: ${documentType}`);

  const docContent = await buildDocumentContent(buffer, mimeType);

  const response = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 1500,
    messages: [{
      role: 'user',
      content: [docContent, { type: 'text', text: prompt }]
    }]
  });

  const text = response.content[0].text;
  const jsonStr = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

  try {
    return JSON.parse(jsonStr);
  } catch (e) {
    console.error('JSON parse failed for document analysis:', e.message);
    console.error('Raw response:', text);
    throw new Error(`Failed to parse AI response for ${documentType}`);
  }
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

    const flagCount = doc.analysis.forgeryFlags?.length || 0;
    score += flagCount * 3;

    // EXIF tampering signals layered on top of Claude's visual assessment
    const exifFlagCount = doc.exifAnalysis?.flags?.length || 0;
    const exifPenalty = exifFlagCount * 4;
    score += exifPenalty;

    factors.push({
      source: type,
      authenticityScore: authenticity,
      flags: doc.analysis.forgeryFlags || [],
      exifFlags: doc.exifAnalysis?.flags || [],
      contribution: Math.round(penaltyPoints + flagCount * 3 + exifPenalty)
    });
  });

  // Aadhaar QR forensic verification — high-confidence tampering signal
  const qr = documentResults.aadhaar?.qrVerification;
  if (qr) {
    if (!qr.qrFound) {
      score += 25;
      factors.push({ source: 'aadhaarQR', check: 'QR_NOT_FOUND', penalty: 25 });
    } else if (qr.crossCheck.mismatches.length > 0) {
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

  // For each submitted document: download → Claude extraction + forensic checks in parallel
  const analysisPromises = Object.entries(documentPaths).map(async ([type, source]) => {
    try {
      console.log(`  [${type}] Loading from ${source}`);
      const loaded = await loadDocument(source);

      // Claude extraction
      const claudePromise = analyzeDocument(loaded, type).catch(err => {
        console.error(`  [${type}] Claude analysis failed:`, err.message);
        return { error: err.message };
      });

      // EXIF analysis — only for images
      const exifPromise = isImage(loaded.mimeType)
        ? analyzeExif(loaded.buffer).catch(err => ({ flags: ['EXIF_PARSE_FAILED'], error: err.message }))
        : Promise.resolve(null);

      const [aiResult, exifResult] = await Promise.all([claudePromise, exifPromise]);

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

      results[type] = {
        ...aiResult,
        mimeType: loaded.mimeType,
        ...(exifResult !== null && { exifAnalysis: exifResult }),
        ...(qrResult !== null && { qrVerification: qrResult })
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

  return {
    loanId,
    processingTimeMs,
    documents: results,
    crossChecks,
    riskAssessment,
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

module.exports = {
  analyzeAllDocuments,
  analyzeDocument,
  crossValidateDocuments,
  calculateRiskScore
};
