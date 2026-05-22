// backend/src/services/verifiers/aadhaarQR.js
// Decodes the QR code from an Aadhaar image and cross-checks the QR-embedded
// fields against the OCR-extracted fields. A genuine Aadhaar always has a QR
// whose contents match the printed text — most amateur Photoshop forgeries
// alter the printed text but cannot regenerate a matching QR code.

const sharp = require('sharp');
const jsQR = require('jsqr');
const zlib = require('zlib');

// Try to render the image at a few sizes — small QRs in busy backgrounds are
// easier to decode after upscaling.
const SCAN_WIDTHS = [1600, 2400, 1200, 3200];

async function decodeQRFromImage(imageBuffer) {
  for (const width of SCAN_WIDTHS) {
    try {
      const { data, info } = await sharp(imageBuffer)
        .resize(width, null, { fit: 'inside', withoutEnlargement: false })
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });

      const result = jsQR(new Uint8ClampedArray(data), info.width, info.height, {
        inversionAttempts: 'attemptBoth'
      });

      if (result?.data) return result;
    } catch (_) { /* try next size */ }
  }
  return null;
}

// Aadhaar QR payloads come in 3 historical formats:
//   1. Pipe-delimited plain text  (older Aadhaars)
//   2. XML string                 (Secure QR v1)
//   3. Compressed binary + RSA signature (Secure QR v2 — current)
// We parse what we can and surface the format type as a signal.
function parseAadhaarQRPayload(rawData) {
  if (!rawData) return { qrType: 'NONE', extracted: null };

  // (1) Pipe-delimited: V2 format starts with a version byte but legacy looks like
  //     "uid|name|gender|yob|co|house|street|locality|vtc|po|district|state|pincode"
  if (rawData.includes('|') && !rawData.startsWith('<')) {
    const parts = rawData.split('|');
    if (parts.length >= 10) {
      return {
        qrType: 'LEGACY_PIPE',
        extracted: {
          uidLast4: parts[0]?.slice(-4),
          name: parts[1],
          gender: parts[2],
          yearOfBirth: parts[3],
          address: parts.slice(4, 13).filter(Boolean).join(', '),
          pincode: parts[12]
        }
      };
    }
  }

  // (2) XML format: <PrintLetterBarcodeData uid="..." name="..." gender="..." ... />
  if (rawData.trim().startsWith('<')) {
    const attrs = {};
    for (const match of rawData.matchAll(/(\w+)="([^"]*)"/g)) {
      attrs[match[1]] = match[2];
    }
    return {
      qrType: 'XML',
      extracted: {
        uidLast4: attrs.uid?.slice(-4),
        name: attrs.name,
        gender: attrs.gender,
        yearOfBirth: attrs.yob || attrs.dob?.split('/').pop(),
        dob: attrs.dob,
        address: [attrs.house, attrs.street, attrs.lm, attrs.loc, attrs.vtc, attrs.po, attrs.dist, attrs.state, attrs.pc].filter(Boolean).join(', '),
        pincode: attrs.pc
      }
    };
  }

  // (3) Secure QR v2: base-10 encoded BigInt → gzipped bytes → 256-byte RSA sig at end.
  //     We attempt to decompress just to confirm structural validity.
  try {
    const big = BigInt(rawData);
    const hex = big.toString(16);
    const bytes = Buffer.from(hex.length % 2 ? '0' + hex : hex, 'hex');
    const decompressed = zlib.gunzipSync(bytes.subarray(0, bytes.length - 256));
    const text = decompressed.toString('utf8');
    const parts = text.split('ÿ').filter(Boolean); // 0xFF delimiter
    return {
      qrType: 'SECURE_V2',
      extracted: {
        // Field ordering per UIDAI Aadhaar Secure QR spec
        emailMobileFlag: parts[0],
        referenceId: parts[1],
        name: parts[2],
        dob: parts[3],
        gender: parts[4],
        address: parts.slice(5, 14).filter(Boolean).join(', '),
        pincode: parts[12]
      },
      signaturePresent: true
    };
  } catch (_) {
    return { qrType: 'UNKNOWN', extracted: null, rawSample: rawData.slice(0, 80) };
  }
}

function normalize(s) {
  return (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

function compareFields(qrData, ocrData) {
  const mismatches = [];
  const checks = [];

  const pairs = [
    ['name', qrData?.name, ocrData?.name],
    ['gender', qrData?.gender, ocrData?.gender],
    ['pincode', qrData?.pincode, ocrData?.pincode]
  ];

  for (const [field, qrVal, ocrVal] of pairs) {
    if (!qrVal || !ocrVal) continue;
    const match = normalize(qrVal).includes(normalize(ocrVal).slice(0, 5)) ||
                  normalize(ocrVal).includes(normalize(qrVal).slice(0, 5));
    checks.push({ field, qr: qrVal, ocr: ocrVal, match });
    if (!match) mismatches.push(field);
  }

  // UID last-4 cross-check (OCR sometimes returns "XXXX XXXX 1234" — keep digits only)
  if (qrData?.uidLast4 && ocrData?.uid) {
    const ocrDigits = ocrData.uid.replace(/\D/g, '');
    const last4 = ocrDigits.slice(-4);
    const match = last4 === qrData.uidLast4;
    checks.push({ field: 'uidLast4', qr: qrData.uidLast4, ocr: last4, match });
    if (!match && last4) mismatches.push('uidLast4');
  }

  return { checks, mismatches };
}

// Main entry: returns a structured verification report for an Aadhaar image.
async function verifyAadhaarQR(imageBuffer, ocrExtracted = {}) {
  const flags = [];
  const qrResult = await decodeQRFromImage(imageBuffer);

  if (!qrResult) {
    flags.push('QR_NOT_FOUND');
    return {
      qrFound: false, qrType: null, extracted: null,
      crossCheck: { checks: [], mismatches: [] },
      flags,
      summary: 'No QR code detected on the Aadhaar — genuine Aadhaars always carry a UIDAI QR.'
    };
  }

  const parsed = parseAadhaarQRPayload(qrResult.data);
  if (!parsed.extracted) flags.push('QR_UNPARSEABLE');

  const crossCheck = parsed.extracted ? compareFields(parsed.extracted, ocrExtracted) : { checks: [], mismatches: [] };
  if (crossCheck.mismatches.length > 0) flags.push('QR_OCR_MISMATCH');

  return {
    qrFound: true,
    qrType: parsed.qrType,
    extracted: parsed.extracted,
    signaturePresent: parsed.signaturePresent || false,
    crossCheck,
    flags,
    summary: flags.length === 0
      ? `QR decoded (${parsed.qrType}); printed fields match QR data.`
      : `QR issues: ${flags.join(', ')}${crossCheck.mismatches.length ? ` — mismatched: ${crossCheck.mismatches.join(', ')}` : ''}`
  };
}

module.exports = { verifyAadhaarQR, parseAadhaarQRPayload, decodeQRFromImage };
