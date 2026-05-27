// backend/src/services/ai/prompts.js
// Shared extraction prompts for both Claude and Gemini
// Model-agnostic: both providers use the same prompt text

module.exports = {
  aadhaar: `You are a document verification expert for Indian banking. Analyze this Aadhaar card image.

CRITICAL: Only flag ACTUAL forgery evidence. Standard Aadhaar format variations are normal. Do NOT flag:
- Minor text alignment differences (Aadhaar cards have varied printing)
- Document composition/layout (official cards may show both sides or folded format)
- Different font sizes between sections (UIDAI uses varied fonts)
- Presence/absence of security features in your view (might be obscured by angle or image crop)

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

Then analyze for ACTUAL forgery indicators (only severe cases):
{
  "forgeryFlags": [
    "PHOTO_MANIPULATION" - if photo shows clear signs of digital editing (blurring, cloning, composition artifacts),
    "FONT_INCONSISTENCY" - if text uses non-standard fonts completely different from UIDAI style,
    "QR_SUSPICIOUS" - if QR code appears pixelated/corrupted or doesn't match expected UIDAI checksum,
    "SEVERE_MISALIGNMENT" - if text is drastically misaligned (not minor offset),
    "COLOR_FORGERY" - if Aadhaar orange/green/blue don't match standard palette AT ALL,
    "COPY_PASTE_EVIDENCE" - if sections appear duplicated or cloned with pixel-perfect matching
  ],
  "authenticityScore": 0.0-1.0 (be generous: genuine cards should score 0.85+),
  "confidence": 0.0-1.0,
  "notes": "detailed observations about authenticity; explain why you flagged anything"
}

Return ONLY valid JSON with both "extracted" and "analysis" keys.`,

  pan: `You are a document verification expert for Indian banking. Analyze this PAN (Permanent Account Number) card.

CRITICAL: Only flag ACTUAL forgery. Do NOT flag:
- Missing hologram if card is photographed at an angle (might not be visible)
- Minor image quality issues or scan artifacts
- Standard variations in PAN card printing

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

Forgery analysis (only severe cases):
{
  "forgeryFlags": [
    "INCORRECT_PAN_FORMAT" - if PAN is provably not 10 chars AAAAA9999A (e.g., 9 chars, letters instead of digits),
    "PHOTO_MANIPULATION" - if photo shows clear digital editing (blur, clone, composition artifacts),
    "FONT_COMPLETE_MISMATCH" - if fonts are completely non-standard (not just minor variation),
    "SEVERE_MISALIGNMENT" - if text is drastically misaligned (not minor offset),
    "BACKGROUND_FORGERY" - if background pattern is clearly fake or doesn't match PAN standard
  ],
  "authenticityScore": 0.0-1.0 (be generous for standard-looking cards),
  "confidence": 0.0-1.0,
  "notes": "detailed observations"
}

Return ONLY valid JSON with "extracted" and "analysis" keys.`,

  itr: `You are a financial document expert for Indian banking compliance. Analyze this Income Tax Return (ITR) document.

CRITICAL: Only flag ACTUAL forgery. Do NOT flag:
- Round incomes (legitimate: many salaried employees have round annual incomes from regular employment)
- Missing acknowledgement number (might be on a different page or obscured)
- Standard variations in ITR form formatting

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

Forgery analysis (only severe cases):
{
  "forgeryFlags": [
    "INCORRECT_PAN_FORMAT" - if PAN is provably wrong format,
    "FAKE_DOCUMENT_STRUCTURE" - if document layout is completely unlike official ITR,
    "COMPUTATION_ERROR" - if numbers are internally inconsistent (e.g., tax paid > income),
    "ARTIFICIAL_INCOME_FIGURE" - if income is suspiciously perfect or matches a pattern
  ],
  "authenticityScore": 0.0-1.0,
  "confidence": 0.0-1.0,
  "notes": "any observations"
}

Return ONLY valid JSON with "extracted" and "analysis" keys.`,

  employmentLetter: `You are an HR document verification expert. Analyze this employment letter/salary certificate.

CRITICAL: Only flag ACTUAL forgery. Do NOT flag:
- Missing company stamp (might be scanned/photographed without clear visibility)
- Generic letterhead appearance (many small companies use basic templates)
- Round salary figures (legitimate: common for salary negotiations or structured pay)
- Missing GST/CIN (many smaller employers don't display this on salary letters)

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

Forgery analysis (only severe cases):
{
  "forgeryFlags": [
    "KNOWN_FORGED_TEMPLATE" - if document matches a publicly known forged template database,
    "INVALID_GST_FORMAT" - if GST is provably wrong format (not just missing),
    "SALARY_ABSURD_MISMATCH" - if salary is inconsistent with designation (e.g., intern earning 100L+),
    "DUPLICATE_SIGNATURES" - if signatures appear pixel-perfect duplicated,
    "DOCUMENT_STRUCTURE_FAKE" - if layout completely doesn't match employment letter standard
  ],
  "authenticityScore": 0.0-1.0,
  "confidence": 0.0-1.0,
  "notes": "observations"
}

Return ONLY valid JSON with "extracted" and "analysis" keys.`
};
