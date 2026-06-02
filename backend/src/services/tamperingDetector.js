// backend/src/services/tamperingDetector.js
// 10-Point Tampering Detection System for Document Verification
// Each detector analyzes different aspects of document authenticity

// Node v24 compatibility: Use sharp if available, fallback to null
let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  sharp = null;
  console.warn('⚠️  sharp not available - image processing detectors will be skipped');
}

const exifr = require('exifr');
const aiProvider = require('./ai');

// Detector weights (must sum to 1.0)
const DETECTOR_WEIGHTS = {
  exifMetadata: 0.08,
  imageQuality: 0.10,
  claudeForensics: 0.25,
  perceptualHash: 0.07,
  fontAnomalies: 0.12,
  compressionArtifacts: 0.11,
  semanticConsistency: 0.09,
  watermarkDetection: 0.10,
  frequencyDomain: 0.08,
  metadataWatermark: 0.00  // No weight for metadata watermark detection (informational only)
};

// Tampering score thresholds
const THRESHOLDS = {
  genuine: 30,      // Score < 30: GENUINE
  suspicious: 70,   // 30-70: SUSPICIOUS (needs manual review)
  forged: 100       // Score >= 70: LIKELY_FORGED
};

// ============================================
// DETECTOR 1: EXIF Metadata Analysis (8%)
// ============================================
async function detectTamperingFromEXIF(imageBuffer) {
  try {
    const exif = await exifr.parse(imageBuffer);
    let score = 0;
    const signals = [];

    if (!exif || Object.keys(exif).length === 0) {
      score += 25;
      signals.push('NO_EXIF_METADATA');
    }

    if (exif?.software?.includes('Photoshop')) {
      score += 35;
      signals.push('EDITED_IN_PHOTOSHOP');
    }

    if (exif?.software?.includes('GIMP') || exif?.software?.includes('Lightroom')) {
      score += 30;
      signals.push('EDITED_IN_IMAGE_EDITOR');
    }

    if (exif?.jpegProcess && exif.jpegProcess !== 'Progressive') {
      score += 15;
      signals.push('RECOMPRESSED_JPEG');
    }

    return { score: Math.min(score, 100), signals, detector: 'EXIF Metadata' };
  } catch (error) {
    console.error('EXIF analysis error:', error.message);
    return { score: 0, signals: ['EXIF_ANALYSIS_ERROR'], detector: 'EXIF Metadata' };
  }
}

// ============================================
// DETECTOR 2: Image Quality Metrics (10%)
// ============================================
async function detectTamperingFromQuality(imageBuffer) {
  try {
    if (!sharp) {
      return { score: 0, signals: ['SHARP_UNAVAILABLE'], detector: 'Image Quality' };
    }

    const image = sharp(imageBuffer);
    const metadata = await image.metadata();
    let score = 0;
    const signals = [];

    // Check for JPEG compression levels
    if (metadata.format === 'jpeg' && metadata.hasAlpha === false) {
      if (metadata.size > 2000000) {
        score += 20;
        signals.push('HIGH_COMPRESSION');
      }
    }

    // Check resolution consistency
    if (metadata.width && metadata.height) {
      const aspectRatio = metadata.width / metadata.height;
      if (aspectRatio < 0.5 || aspectRatio > 2.0) {
        score += 15;
        signals.push('UNUSUAL_ASPECT_RATIO');
      }
    }

    // Check for transparency (PNG edited images often have transparency)
    if (metadata.hasAlpha) {
      score += 20;
      signals.push('PNG_WITH_TRANSPARENCY');
    }

    return { score: Math.min(score, 100), signals, detector: 'Image Quality' };
  } catch (error) {
    console.error('Quality analysis error:', error.message);
    return { score: 0, signals: ['QUALITY_ANALYSIS_ERROR'], detector: 'Image Quality' };
  }
}

// ============================================
// DETECTOR 3: Claude AI Forensics (25%)
// ============================================
async function detectTamperingWithClaudeForensics(imageBuffer, documentType) {
  try {
    const base64Image = imageBuffer.toString('base64');
    const forensicPrompt = `You are an expert forensic document analyst specializing in detecting forged ${documentType} documents.

Analyze this image for signs of tampering, forgery, or manipulation.

Focus on:
1. TEXT ANOMALIES: Different fonts, sizes, colors, alignment, spacing
2. PHOTO ANOMALIES: Face quality, lighting, shadows, blurring  
3. PHYSICAL SIGNS: Erasure marks, overwriting, white-out, scratches
4. PRINTING ISSUES: Misalignment, color bleeding, compression
5. SECURITY FEATURES: Watermarks, holograms, visible or missing
6. OVERALL CONSISTENCY: All elements from same source?

Respond with JSON only:
{
  "confidence": <0-100>,
  "verdict": "AUTHENTIC|POSSIBLY_GENUINE|SUSPICIOUS|LIKELY_FORGED",
  "findings": ["finding1", "finding2"],
  "explanation": "Brief reason"
}`;

    const response = await aiProvider.call('document-forensics', {
      messages: [{
        role: 'user',
        content: [
          { type: 'text', text: forensicPrompt },
          { type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: base64Image } }
        ]
      }]
    });

    const result = JSON.parse(response.content[0].text);
    const verdictScores = {
      'AUTHENTIC': 5,
      'POSSIBLY_GENUINE': 35,
      'SUSPICIOUS': 65,
      'LIKELY_FORGED': 95
    };

    return {
      score: verdictScores[result.verdict] || result.confidence,
      signals: result.findings || [],
      detector: 'Claude Forensics',
      explanation: result.explanation
    };
  } catch (error) {
    console.error('Claude forensics error:', error.message);
    return { score: 0, signals: ['CLAUDE_ANALYSIS_ERROR'], detector: 'Claude Forensics' };
  }
}

// ============================================
// DETECTOR 4: Semantic Consistency (9%)
// ============================================
function detectFromSemanticConsistency(documentAnalysis) {
  let score = 0;
  const signals = [];

  try {
    const extracted = documentAnalysis?.extracted || {};
    const qrData = documentAnalysis?.qrVerification?.extracted || {};

    // Name consistency
    if (extracted.name && qrData.name) {
      const normalized1 = (extracted.name || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      const normalized2 = (qrData.name || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      if (normalized1 !== normalized2) {
        score += 35;
        signals.push('NAME_MISMATCH_OCR_vs_QR');
      }
    }

    // DOB logic
    if (extracted.dob && extracted.issueDate) {
      const dob = new Date(extracted.dob);
      const issueDate = new Date(extracted.issueDate);
      if (dob > issueDate) {
        score += 50;
        signals.push('IMPOSSIBLE_DOB_BEFORE_ISSUE');
      }
    }

    // Expiry check
    if (extracted.expiryDate) {
      const expiryDate = new Date(extracted.expiryDate);
      if (expiryDate < new Date()) {
        score += 20;
        signals.push('DOCUMENT_EXPIRED');
      }
    }

    return { score: Math.min(score, 100), signals, detector: 'Semantic Consistency' };
  } catch (error) {
    console.error('Semantic consistency error:', error.message);
    return { score: 0, signals: ['SEMANTIC_ANALYSIS_ERROR'], detector: 'Semantic Consistency' };
  }
}

// ============================================
// DETECTOR 5: Watermark Detection (10%)
// ============================================
async function detectMissingWatermarks(imageBuffer, documentType) {
  try {
    let score = 0;
    const signals = [];

    // Document-specific security features
    const expectedFeatures = {
      aadhaar: { watermark: true, qr: true },
      pan: { numberPattern: true },
      itr: { stamp: true },
      employmentLetter: { letterhead: true }
    };

    const features = expectedFeatures[documentType] || {};

    // For now, basic check - can expand with OCR-based logo detection
    const base64Image = imageBuffer.toString('base64');
    
    // Check if document has security features (simplified)
    if (features.watermark && base64Image.length < 100000) {
      score += 30;
      signals.push('POSSIBLE_LOW_QUALITY_SCAN');
    }

    return { score: Math.min(score, 100), signals, detector: 'Watermark Detection' };
  } catch (error) {
    console.error('Watermark detection error:', error.message);
    return { score: 0, signals: ['WATERMARK_CHECK_ERROR'], detector: 'Watermark Detection' };
  }
}

// ============================================
// DETECTOR 6: Font Anomalies (12%)
// ============================================
async function detectFontAnomalies(imageBuffer, documentType) {
  try {
    let Tesseract;
    try {
      Tesseract = require('tesseract.js');
    } catch (e) {
      return { score: 0, signals: ['TESSERACT_UNAVAILABLE'], detector: 'Font Anomalies' };
    }

    let score = 0;
    const signals = [];

    // Use Tesseract to detect text blocks and analyze font consistency
    const { data } = await Tesseract.recognize(imageBuffer, 'eng');

    const textBlocks = data.paragraphs || [];
    const fontSizes = new Set();
    const fontFamilies = new Set();

    // Collect all font metrics from OCR
    textBlocks.forEach(block => {
      if (block.confidence > 50) {
        fontSizes.add(Math.round(block.bbox?.height || 0));
        // Tesseract provides confidence; low confidence = potential font mismatch
        if (block.confidence < 60) {
          score += 5;
        }
      }
    });

    // Too many font sizes suggests editing
    if (fontSizes.size > 5) {
      score += 25;
      signals.push('EXCESSIVE_FONT_VARIETY');
    }

    // Low average confidence suggests font anomalies
    if (data.confidence < 70) {
      score += 20;
      signals.push('FONT_RECOGNITION_ISSUES');
    }

    return { score: Math.min(score, 100), signals, detector: 'Font Anomalies' };
  } catch (error) {
    console.error('Font anomalies detection error:', error.message);
    return { score: 0, signals: ['FONT_ANALYSIS_ERROR'], detector: 'Font Anomalies' };
  }
}

// ============================================
// DETECTOR 7: Compression Artifacts (11%)
// ============================================
async function detectCompressionArtifacts(imageBuffer) {
  try {
    if (!sharp) {
      return { score: 0, signals: ['SHARP_UNAVAILABLE'], detector: 'Compression Artifacts' };
    }

    const image = sharp(imageBuffer);
    const metadata = await image.metadata();
    let score = 0;
    const signals = [];

    // Check for JPEG compression artifacts
    if (metadata.format === 'jpeg') {
      // Analyze compression level through file size ratio
      const pixels = metadata.width * metadata.height;
      const bytesPerPixel = imageBuffer.length / pixels;

      // Normal JPEG: 0.5-2 bytes per pixel
      // Over-compressed: < 0.3 bytes per pixel
      // Suspiciously high quality: > 3 bytes per pixel (might be PNG converted to JPEG)

      if (bytesPerPixel < 0.3) {
        score += 25;
        signals.push('EXCESSIVE_JPEG_COMPRESSION');
      }

      if (bytesPerPixel > 3) {
        score += 30;
        signals.push('UNUSUAL_COMPRESSION_RATIO');
      }

      // Check for progressive vs baseline encoding
      // Progressive JPEGs (used in editing software) vs baseline
      if (metadata.jpegProcess === 'progressive') {
        score += 15;
        signals.push('PROGRESSIVE_JPEG_ENCODING');
      }
    }

    // Check for multiple compression cycles (re-compression sign)
    if (metadata.format === 'jpeg' && metadata.size > 1000000) {
      score += 20;
      signals.push('POTENTIAL_RECOMPRESSION');
    }

    return { score: Math.min(score, 100), signals, detector: 'Compression Artifacts' };
  } catch (error) {
    console.error('Compression artifacts error:', error.message);
    return { score: 0, signals: ['COMPRESSION_ANALYSIS_ERROR'], detector: 'Compression Artifacts' };
  }
}

// ============================================
// DETECTOR 8: Perceptual Hash (7%)
// ============================================
async function detectPerceptualHash(imageBuffer) {
  try {
    let pHash;
    try {
      pHash = require('sharp-phash');
    } catch (e) {
      return { score: 0, signals: ['PHASH_UNAVAILABLE'], detector: 'Perceptual Hash' };
    }

    let score = 0;
    const signals = [];

    // Generate perceptual hash of image
    const hash = pHash.hash(imageBuffer);

    // Check against known forgery templates (simplified)
    // In production, would compare against database of known forged documents
    const knownForgeryHashes = [
      // These would be collected from previous confirmed forgeries
      // Format: { hash: 'hash_string', documentType: 'aadhaar', name: 'Template X' }
    ];

    // Compare current hash with known forgery hashes
    for (const known of knownForgeryHashes) {
      const similarity = calculateHashSimilarity(hash, known.hash);

      // If hash similarity > 90%, likely same template
      if (similarity > 0.90) {
        score += 50;
        signals.push(`MATCHES_KNOWN_FORGERY_${known.name}`);
      }
      // If similarity > 75%, possible variant
      else if (similarity > 0.75) {
        score += 25;
        signals.push(`SIMILAR_TO_KNOWN_FORGERY_${known.name}`);
      }
    }

    return { score: Math.min(score, 100), signals, detector: 'Perceptual Hash' };
  } catch (error) {
    console.error('Perceptual hash error:', error.message);
    return { score: 0, signals: ['PHASH_ERROR'], detector: 'Perceptual Hash' };
  }
}

// Helper function for hash similarity (Hamming distance)
function calculateHashSimilarity(hash1, hash2) {
  if (!hash1 || !hash2 || hash1.length !== hash2.length) return 0;

  let matches = 0;
  for (let i = 0; i < hash1.length; i++) {
    if (hash1[i] === hash2[i]) matches++;
  }

  return matches / hash1.length;
}

// ============================================
// DETECTOR 9: Frequency Domain Analysis (8%)
// ============================================
async function detectFrequencyDomain(imageBuffer) {
  try {
    if (!sharp) {
      return { score: 0, signals: ['SHARP_UNAVAILABLE'], detector: 'Frequency Domain' };
    }

    let FFT;
    try {
      FFT = require('fft-js').FFT;
    } catch (e) {
      // FFT not available, skip frequency analysis
      return { score: 0, signals: ['FFT_UNAVAILABLE'], detector: 'Frequency Domain' };
    }

    const image = sharp(imageBuffer);
    const metadata = await image.metadata();
    const raw = await image.grayscale().raw().toBuffer();

    let score = 0;
    const signals = [];

    // Sample the image for FFT analysis (use center 256x256 region)
    const sampleSize = 256;
    const stride = Math.max(1, Math.floor(Math.sqrt(raw.length / (sampleSize * sampleSize))));

    const samples = [];
    for (let i = 0; i < Math.min(raw.length, sampleSize * sampleSize); i += stride) {
      samples.push(raw[i]);
    }

    // Perform FFT on pixel values
    const fft = new FFT(Math.pow(2, Math.ceil(Math.log2(samples.length))));
    const freqDomain = fft.forward(samples);

    // Analyze frequency components
    let lowFreq = 0, highFreq = 0;
    const mid = freqDomain.length / 2;

    for (let i = 0; i < mid; i++) {
      const magnitude = Math.sqrt(freqDomain[i][0] ** 2 + freqDomain[i][1] ** 2);

      if (i < mid * 0.2) {
        lowFreq += magnitude;
      } else {
        highFreq += magnitude;
      }
    }

    const ratio = highFreq / (lowFreq + 1); // Avoid division by zero

    // Normal documents have balanced frequencies
    // Spliced/edited regions have unusual frequency patterns
    if (ratio > 2.0) {
      score += 35;
      signals.push('ABNORMAL_HIGH_FREQUENCY');
    }

    if (ratio < 0.5) {
      score += 25;
      signals.push('ABNORMAL_LOW_FREQUENCY');
    }

    // Check for periodic patterns (watermarks, holograms)
    let periodicity = 0;
    for (let i = 0; i < freqDomain.length / 4; i++) {
      const magnitude = Math.sqrt(freqDomain[i][0] ** 2 + freqDomain[i][1] ** 2);
      if (magnitude > 1000) periodicity++;
    }

    if (periodicity > 10) {
      score += 20;
      signals.push('STRONG_PERIODIC_PATTERN');
    }

    return { score: Math.min(score, 100), signals, detector: 'Frequency Domain' };
  } catch (error) {
    console.error('Frequency domain analysis error:', error.message);
    return { score: 0, signals: ['FREQUENCY_ANALYSIS_ERROR'], detector: 'Frequency Domain' };
  }
}

// ============================================
// DETECTOR 10: Metadata Watermark (0%)
// ============================================
async function detectMetadataWatermark(imageBuffer) {
  try {
    const exifr = require('exifr');
    let score = 0;
    const signals = [];

    const exif = await exifr.parse(imageBuffer);

    // Check for steganography markers or custom metadata
    if (!exif) {
      return { score: 0, signals: [], detector: 'Metadata Watermark' };
    }

    // Look for suspicious or missing standard fields
    const criticalFields = ['Make', 'Model', 'DateTime', 'Orientation'];
    let missingCount = 0;

    criticalFields.forEach(field => {
      if (!exif[field]) missingCount++;
    });

    if (missingCount >= 3) {
      score += 25;
      signals.push('CRITICAL_METADATA_MISSING');
    }

    // Check for non-standard metadata tags (steganography)
    const exifKeys = Object.keys(exif);
    const standardKeys = ['Make', 'Model', 'DateTime', 'Orientation', 'XResolution', 'YResolution'];
    const nonStandardCount = exifKeys.filter(k => !standardKeys.includes(k)).length;

    if (nonStandardCount > 10) {
      score += 15;
      signals.push('EXCESSIVE_NON_STANDARD_METADATA');
    }

    // Check for copyright/watermark tags
    const copyrightField = exif.Copyright || exif['0x8298'] || '';
    if (copyrightField && copyrightField.length > 100) {
      score += 20;
      signals.push('SUSPICIOUS_COPYRIGHT_FIELD');
    }

    return { score: Math.min(score, 100), signals, detector: 'Metadata Watermark' };
  } catch (error) {
    console.error('Metadata watermark error:', error.message);
    return { score: 0, signals: ['METADATA_WM_ERROR'], detector: 'Metadata Watermark' };
  }
}

// ============================================
// MASTER ORCHESTRATION FUNCTION
// ============================================
async function detectDocumentTampering(imageBuffer, documentType, documentAnalysis = {}) {
  console.log(`\n🔍 Starting 10-Point Tampering Detection for ${documentType}...`);

  const detectors = [
    { name: 'EXIF Metadata Analysis', weight: DETECTOR_WEIGHTS.exifMetadata, fn: () => detectTamperingFromEXIF(imageBuffer) },
    { name: 'Image Quality Metrics', weight: DETECTOR_WEIGHTS.imageQuality, fn: () => detectTamperingFromQuality(imageBuffer) },
    { name: 'Claude AI Forensics', weight: DETECTOR_WEIGHTS.claudeForensics, fn: () => detectTamperingWithClaudeForensics(imageBuffer, documentType) },
    { name: 'Semantic Consistency', weight: DETECTOR_WEIGHTS.semanticConsistency, fn: () => detectFromSemanticConsistency(documentAnalysis) },
    { name: 'Watermark Detection', weight: DETECTOR_WEIGHTS.watermarkDetection, fn: () => detectMissingWatermarks(imageBuffer, documentType) },
    { name: 'Font Anomalies', weight: DETECTOR_WEIGHTS.fontAnomalies, fn: () => detectFontAnomalies(imageBuffer, documentType) },
    { name: 'Compression Artifacts', weight: DETECTOR_WEIGHTS.compressionArtifacts, fn: () => detectCompressionArtifacts(imageBuffer) },
    { name: 'Perceptual Hash', weight: DETECTOR_WEIGHTS.perceptualHash, fn: () => detectPerceptualHash(imageBuffer) },
    { name: 'Frequency Domain', weight: DETECTOR_WEIGHTS.frequencyDomain, fn: () => detectFrequencyDomain(imageBuffer) },
    { name: 'Metadata Watermark', weight: DETECTOR_WEIGHTS.metadataWatermark, fn: () => detectMetadataWatermark(imageBuffer) }
  ];

  let totalWeightedScore = 0;
  const detectorResults = [];

  // Run detectors in parallel
  const results = await Promise.allSettled(detectors.map(d => d.fn()));

  for (let i = 0; i < detectors.length; i++) {
    const detector = detectors[i];
    const result = results[i];
    let detectorScore = 0, signals = [], explanation = '';

    if (result.status === 'fulfilled') {
      detectorScore = result.value.score || 0;
      signals = result.value.signals || [];
      explanation = result.value.explanation || '';
    } else {
      console.warn(`⚠️ ${detector.name} failed:`, result.reason?.message);
      signals = ['DETECTOR_ERROR'];
    }

    const weightedScore = detectorScore * detector.weight;
    totalWeightedScore += weightedScore;

    detectorResults.push({
      name: detector.name,
      score: Math.round(detectorScore * 10) / 10,
      weightedScore: Math.round(weightedScore * 100) / 100,
      weight: detector.weight,
      signals,
      explanation
    });

    console.log(`✓ ${detector.name}: ${detectorScore.toFixed(1)}/100`);
  }

  // Final decision
  let decision = 'GENUINE', riskLevel = 'LOW', recommendation = 'APPROVE';

  if (totalWeightedScore >= 70) {
    decision = 'LIKELY_FORGED';
    riskLevel = 'CRITICAL';
    recommendation = 'REJECT';
  } else if (totalWeightedScore >= 30) {
    decision = 'SUSPICIOUS';
    riskLevel = 'MEDIUM';
    recommendation = 'MANUAL_REVIEW';
  }

  const tamperingAnalysis = {
    finalTamperingScore: Math.round(totalWeightedScore * 10) / 10,
    decision,
    riskLevel,
    confidence: Math.round(Math.abs(totalWeightedScore - 50) * 2 * 10) / 10,
    recommendation,
    detectorBreakdown: detectorResults,
    timestamp: new Date().toISOString()
  };

  console.log(`\n📊 Final Tampering Score: ${tamperingAnalysis.finalTamperingScore}/100`);
  console.log(`📌 Decision: ${decision}`);

  return tamperingAnalysis;
}

module.exports = { detectDocumentTampering, THRESHOLDS };
