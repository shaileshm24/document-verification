# Risk Scoring Model

How the system calculates fraud risk (0–100 pts) from multiple independent signals.

## Overview

Risk score is calculated from **three independent layers**:

1. **Per-document AI analysis** (25–80 pts depending on document importance)
2. **EXIF forensics** (0–16 pts if image shows editing software signatures)
3. **Cross-document validation** (0–30+ pts if documents contradict each other)
4. **Aadhaar QR verification** (20–30 pts only if QR exists AND data mismatches)

**No double-counting:** Each issue is counted exactly once.

## Layer 1: Per-Document AI Analysis

Each document has a weight based on importance:

| Document | Weight | How it's scored |
|----------|--------|-----------------|
| Aadhaar  | 25     | `25 × (1 - authenticityScore)` |
| PAN      | 20     | `20 × (1 - authenticityScore)` |
| ITR      | 18     | `18 × (1 - authenticityScore)` |
| Employment Letter | 12 | `12 × (1 - authenticityScore)` |

**Example:** If Aadhaar has `authenticityScore = 0.8` (80% authentic), penalty = `25 × 0.2 = 5 pts`.

### Forgery Flag Multiplier

Severe forgery flags add **+3 pts each**. Benign flags (NO_EXIF_METADATA, METADATA_MISMATCH) are filtered out.

Examples of severe flags:
- `PHOTO_MANIPULATION` — Photo shows clear editing
- `FONT_COMPLETE_MISMATCH` — Text uses wrong fonts
- `COLOR_FORGERY` — Colors completely wrong
- `COPY_PASTE_EVIDENCE` — Sections appear cloned

## Layer 2: EXIF Forensics

Edited images are detected via EXIF metadata:

| Flag | Points |
|------|--------|
| `EDITED_IN_PHOTOSHOP` | +4 |
| `EDITED_IN_GIMP` | +4 |
| `FUTURE_TIMESTAMP` | +4 |
| `MODIFIED_WITH_FILTERS` | +4 |

Benign flag (NO_EXIF_METADATA) is ignored — common in re-saved images.

## Layer 3: Cross-Document Validation

Checks consistency across all documents:

| Check | Penalty if Failed |
|-------|-------------------|
| NAME_MATCH | +15 |
| INCOME_CONSISTENCY | +20 |
| PAN_FORMAT_VALID | +12 |
| PAN_SURNAME_RULE | +8 |
| PAN_AADHAAR_NAME_MATCH | +18 |
| PAN_AADHAAR_DOB_MATCH | +15 |
| AADHAAR_QR_PRESENT | +20 |
| EMPLOYER_GST_VALID | +12 |
| EMPLOYMENT_LETTER_RECENT | +5 |

## Layer 4: Aadhaar QR Verification

**Only penalizes if QR exists but data doesn't match printed text:**

| Scenario | Penalty |
|----------|---------|
| QR found + data matches | 0 pts |
| QR found + data mismatches | +30 pts |
| QR not found | 0 pts (already in cross-check) |

## Final Score → Recommendation

| Score | Risk Level | Recommendation |
|-------|-----------|----------------|
| 0–39  | **LOW** | ✅ **APPROVE** |
| 40–69 | **MEDIUM** | 🔍 **MANUAL_REVIEW** |
| 70+   | **HIGH** | ❌ **REJECT** |

## Example Breakdown

**Your genuine Aadhaar (QR not detected):**
```
Layer 1 (Aadhaar): 0 pts (authenticityScore = 0.95)
Layer 2 (EXIF): 0 pts (no EXIF is benign, filtered)
Layer 3 (Cross-check AADHAAR_QR_PRESENT fails): +20 pts
Layer 4 (QR forensic): 0 pts (no duplicate penalty)
────────────────────────────────
Total: 20 pts → MEDIUM REVIEW
```

## Key Design Decisions

- **Fail-closed:** Missing documents = full weight penalty. A missing ITR = +18 pts instantly.
- **No double-counting:** Same issue never adds twice (e.g., QR missing is only in cross-checks, not QR forensic).
- **Benign flags ignored:** `NO_EXIF_METADATA` is expected for screenshots/re-saved images.
- **AI authenticityScore is primary:** Document authenticity is the main signal; forgery flags are secondary (+3 each).
