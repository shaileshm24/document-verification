// backend/src/services/verifiers/panValidator.js
// PAN structural validation + cross-document consistency checks against Aadhaar.
//
// Indian PAN format: AAAAA9999A
//   - chars 1-3: alphabetic series (uppercase)
//   - char 4   : entity type (P=Individual, C=Company, H=HUF, F=Firm, A=AOP,
//                T=Trust, B=BOI, L=Local Authority, J=Artificial Judicial, G=Govt)
//   - char 5   : first letter of surname (for individuals)
//   - chars 6-9: numeric
//   - char 10  : alphabetic checksum

const PAN_REGEX = /^[A-Z]{3}[ABCFGHJLPT][A-Z][0-9]{4}[A-Z]$/;
const ENTITY_NAMES = {
  P: 'Individual', C: 'Company', H: 'HUF', F: 'Firm', A: 'AOP',
  T: 'Trust', B: 'BOI', L: 'Local Authority', J: 'Artificial Judicial Person', G: 'Government'
};

function validatePANFormat(pan) {
  const flags = [];
  if (!pan) {
    return { valid: false, flags: ['PAN_MISSING'], pan: null, entityType: null };
  }
  const normalized = pan.replace(/\s+/g, '').toUpperCase();

  if (normalized.length !== 10) flags.push('PAN_WRONG_LENGTH');
  if (!PAN_REGEX.test(normalized)) flags.push('PAN_FORMAT_INVALID');

  const entityChar = normalized[3];
  const entityType = ENTITY_NAMES[entityChar] || null;
  if (!entityType) flags.push('PAN_ENTITY_TYPE_UNKNOWN');

  return {
    valid: flags.length === 0,
    pan: normalized,
    entityType,
    entityChar,
    flags
  };
}

// For an individual PAN, char 5 must be the first letter of the surname.
// Names are stored on PAN in the form "FIRSTNAME MIDDLENAME SURNAME".
function checkPANSurnameMatch(pan, fullName) {
  if (!pan || !fullName) return { match: null, detail: 'PAN or name missing' };
  const normalized = pan.toUpperCase();
  if (normalized[3] !== 'P') return { match: null, detail: 'Surname rule applies only to individual PANs' };

  const surname = fullName.trim().split(/\s+/).pop();
  const expected = surname?.[0]?.toUpperCase();
  const actual = normalized[4];
  return {
    match: expected === actual,
    expectedInitial: expected,
    actualInitial: actual,
    surnameDetected: surname,
    detail: expected === actual
      ? `PAN surname initial '${actual}' matches surname '${surname}'`
      : `PAN surname initial '${actual}' does NOT match surname '${surname}' (expected '${expected}')`
  };
}

function normalizeName(s) {
  return (s || '').toLowerCase().replace(/[^a-z\s]/g, '').replace(/\s+/g, ' ').trim();
}

function nameSimilarity(a, b) {
  const na = normalizeName(a), nb = normalizeName(b);
  if (!na || !nb) return 0;
  if (na === nb) return 1;
  // Token-set overlap — handles re-ordered or missing middle names
  const ta = new Set(na.split(' '));
  const tb = new Set(nb.split(' '));
  const intersection = [...ta].filter(t => tb.has(t)).length;
  const union = new Set([...ta, ...tb]).size;
  return union === 0 ? 0 : intersection / union;
}

function crossCheckPanAadhaar({ panName, panDob, aadhaarName, aadhaarDob }) {
  const checks = [];

  if (panName && aadhaarName) {
    const score = nameSimilarity(panName, aadhaarName);
    checks.push({
      check: 'PAN_AADHAAR_NAME_MATCH',
      pass: score >= 0.6,
      score: Math.round(score * 100) / 100,
      detail: score >= 0.6
        ? `PAN name '${panName}' and Aadhaar name '${aadhaarName}' match (${Math.round(score * 100)}%)`
        : `PAN name '${panName}' differs significantly from Aadhaar name '${aadhaarName}' (${Math.round(score * 100)}%)`
    });
  }

  if (panDob && aadhaarDob) {
    const a = panDob.replace(/[^0-9]/g, '');
    const b = aadhaarDob.replace(/[^0-9]/g, '');
    const match = a === b || a.endsWith(b) || b.endsWith(a);
    checks.push({
      check: 'PAN_AADHAAR_DOB_MATCH',
      pass: match,
      detail: match
        ? `DOB matches across PAN (${panDob}) and Aadhaar (${aadhaarDob})`
        : `DOB MISMATCH: PAN=${panDob} vs Aadhaar=${aadhaarDob}`
    });
  }

  return checks;
}

module.exports = { validatePANFormat, checkPANSurnameMatch, crossCheckPanAadhaar, nameSimilarity };
