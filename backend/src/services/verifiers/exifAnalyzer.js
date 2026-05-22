// backend/src/services/verifiers/exifAnalyzer.js
// Extracts EXIF / XMP metadata from an uploaded image and flags signals
// commonly seen in tampered or synthetic documents:
//   - Edited in Photoshop / GIMP / Affinity / Canva
//   - Software field shows screenshot tools (Lightshot, Snipping Tool)
//   - DateTimeDigitized differs significantly from DateTime (re-saved)
//   - All EXIF stripped (genuine phone scans almost always retain some metadata)

const exifr = require('exifr');

const EDITING_SOFTWARE_PATTERNS = [
  { pattern: /photoshop/i, flag: 'EDITED_IN_PHOTOSHOP' },
  { pattern: /gimp/i, flag: 'EDITED_IN_GIMP' },
  { pattern: /affinity/i, flag: 'EDITED_IN_AFFINITY' },
  { pattern: /canva/i, flag: 'EDITED_IN_CANVA' },
  { pattern: /pixelmator/i, flag: 'EDITED_IN_PIXELMATOR' },
  { pattern: /paint\.net|paint net/i, flag: 'EDITED_IN_PAINTNET' },
  { pattern: /snipping tool|lightshot|greenshot/i, flag: 'SCREENSHOT_TOOL' }
];

// Software strings that are expected on genuine phone/scanner captures
const BENIGN_SOFTWARE_PATTERNS = [
  /android/i, /ios/i, /iphone/i, /camera/i, /scanner/i, /cam scanner/i, /adobe scan/i
];

function parseDateTime(dt) {
  if (!dt) return null;
  if (dt instanceof Date) return dt;
  // EXIF format: "YYYY:MM:DD HH:MM:SS"
  const cleaned = String(dt).replace(/^(\d{4}):(\d{2}):(\d{2})/, '$1-$2-$3');
  const d = new Date(cleaned);
  return isNaN(d.getTime()) ? null : d;
}

async function analyzeExif(imageBuffer) {
  const flags = [];
  let exif = null;

  try {
    exif = await exifr.parse(imageBuffer, {
      tiff: true, exif: true, xmp: true, icc: false, iptc: true
    });
  } catch (_) {
    // Some images simply have no parseable metadata — handled below
  }

  if (!exif || Object.keys(exif).length === 0) {
    flags.push('NO_EXIF_METADATA');
    return {
      flags, metadata: null,
      summary: 'Image has no EXIF metadata — common in screenshots, re-saved files, and synthetic images.'
    };
  }

  const softwareFields = [exif.Software, exif.CreatorTool, exif.HistorySoftwareAgent].filter(Boolean);
  for (const sw of softwareFields) {
    const matched = EDITING_SOFTWARE_PATTERNS.find(p => p.pattern.test(sw));
    if (matched && !flags.includes(matched.flag)) flags.push(matched.flag);
  }

  const hasBenignCapture = softwareFields.some(sw => BENIGN_SOFTWARE_PATTERNS.some(p => p.test(sw)));
  const hasNoCameraInfo = !exif.Make && !exif.Model && !hasBenignCapture;
  if (hasNoCameraInfo && softwareFields.length > 0) {
    flags.push('NO_CAMERA_INFO_BUT_HAS_SOFTWARE');
  }

  const dtOriginal = parseDateTime(exif.DateTimeOriginal);
  const dtDigitized = parseDateTime(exif.CreateDate || exif.DateTimeDigitized);
  const dtModified = parseDateTime(exif.ModifyDate);

  if (dtOriginal && dtModified) {
    const driftHrs = Math.abs(dtModified - dtOriginal) / 36e5;
    if (driftHrs > 24) {
      flags.push('MODIFIED_LONG_AFTER_CAPTURE');
    }
  }

  if (dtOriginal && dtDigitized && Math.abs(dtOriginal - dtDigitized) > 60 * 1000) {
    flags.push('CAPTURE_DIGITIZE_TIMESTAMP_MISMATCH');
  }

  // History fields populated by Photoshop XMP — strong tampering signal
  if (exif.HistoryAction || exif.HistoryWhen || exif.DerivedFromDocumentID) {
    if (!flags.includes('EDITED_IN_PHOTOSHOP')) flags.push('EDITING_HISTORY_PRESENT');
  }

  return {
    flags,
    metadata: {
      software: softwareFields,
      cameraMake: exif.Make || null,
      cameraModel: exif.Model || null,
      dateTimeOriginal: dtOriginal,
      dateTimeModified: dtModified,
      hasEditingHistory: Boolean(exif.HistoryAction || exif.DerivedFromDocumentID)
    },
    summary: flags.length === 0
      ? 'EXIF clean — no editing-software signatures or timestamp anomalies detected.'
      : `EXIF issues: ${flags.join(', ')}`
  };
}

module.exports = { analyzeExif };
