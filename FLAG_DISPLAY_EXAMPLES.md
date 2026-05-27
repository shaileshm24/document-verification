# 📊 Flag Display Examples - What You'll See

## Before (Old Way)
```
Flags: 3
(User confused - what are the 3 flags?)
```

---

## After (New Way)

### Example 1: Aadhaar with Missing QR

```
═══════════════════════════════════════════════════════

🚨 All Detected Issues (2 flags)

Summary: ⚠️ Critical issues found

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔴 No QR code detected
   Genuine Aadhaar cards always carry a UIDAI-signed 
   QR code. Its absence indicates the document may 
   be counterfeit or tampered.
   QR_NOT_FOUND • QR Verification

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🟡 No EXIF metadata (re-saved/screenshot)
   Document was likely re-saved or screenshot - 
   original metadata missing
   NO_EXIF_METADATA • EXIF Analysis

═══════════════════════════════════════════════════════
```

**What officer understands:**
- ❌ QR missing = RED ALERT (probably forged)
- ⚠️ No EXIF = Minor issue (re-saved, less critical)
- 🎯 Action: REJECT - Missing security feature

---

### Example 2: Aadhaar with Photoshop Edits

```
═══════════════════════════════════════════════════════

🚨 All Detected Issues (3 flags)

Summary: ⚠️ Critical issues found

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🟠 EXIF: edited in Adobe Photoshop
   Image shows signs of editing in Adobe Photoshop
   software. Genuine documents should not have 
   been edited.
   EDITED_IN_PHOTOSHOP • EXIF Analysis

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🟠 Fonts inconsistent with template
   Font usage doesn't match authentic Aadhaar 
   template patterns
   FONT_INCONSISTENCY • AI Forensics

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🟠 QR data does not match printed text
   The QR code contains different data than the 
   printed text. Mismatches: name, address
   QR_OCR_MISMATCH • QR Verification

═══════════════════════════════════════════════════════
```

**What officer understands:**
- ⚠️ Photoshopped = HIGH RISK (edited)
- ⚠️ Fonts wrong = HIGH RISK (template mismatch)
- ⚠️ QR mismatch = HIGH RISK (data inconsistency)
- 🎯 Action: REJECT - Multiple inconsistencies

---

### Example 3: Genuine Aadhaar (No Issues)

```
═══════════════════════════════════════════════════════

✅ All Detected Issues (0 flags)

═══════════════════════════════════════════════════════
```

**What officer understands:**
- ✅ No red flags = LIKELY GENUINE
- 🎯 Action: APPROVE

---

## Severity Indicators Explained

### 🔴 CRITICAL (Red)
- QR not found (missing security feature)
- Complete tampering evidence
- **Action:** REJECT immediately

### 🟠 HIGH (Orange)
- Photoshop/GIMP edits detected
- Font mismatches
- QR/OCR data inconsistency
- Text manipulation evidence
- **Action:** MANUAL REVIEW required

### 🟡 MEDIUM (Yellow)
- No EXIF metadata (re-saved)
- Unusual compression
- Minor inconsistencies
- **Action:** Flag for review, not automatic reject

---

## Flag Sources

Each flag shows where it came from:

| Source | Icon | Meaning |
|--------|------|---------|
| AI Forensics | 🤖 | Claude Vision detected it |
| QR Verification | 📱 | UIDAI QR code check |
| EXIF Analysis | 📷 | Image metadata check |
| Semantic Check | 🧠 | Logic/consistency check |
| Watermark Detection | 🔐 | Security feature check |

---

## How to Read a Flag Entry

```
🔴 No QR code detected
   ↑ Severity (color)
   
   Genuine Aadhaar cards always carry a UIDAI QR code...
   ↑ Human-readable explanation
   
   QR_NOT_FOUND • QR Verification
   ↑ Technical code  ↑ Source detector
```

---

## Common Flag Codes

### QR-Related
- `QR_NOT_FOUND` - No QR detected (CRITICAL)
- `QR_OCR_MISMATCH` - QR data ≠ printed text (HIGH)
- `QR_UNPARSEABLE` - QR corrupted (HIGH)

### EXIF-Related
- `EDITED_IN_PHOTOSHOP` - Adobe Photoshop used (HIGH)
- `EDITED_IN_GIMP` - GIMP editor used (HIGH)
- `NO_EXIF_METADATA` - Re-saved/screenshot (MEDIUM)
- `TIMESTAMP_FUTURE` - Impossible date (HIGH)

### AI-Detected
- `FONT_INCONSISTENCY` - Fonts don't match (HIGH)
- `PHOTO_MANIPULATION` - Photo edited (HIGH)
- `ALIGNMENT_ISSUES` - Text misaligned (HIGH)
- `BACKGROUND_TAMPERING` - Background irregular (HIGH)

---

## Database Storage

All flags are stored in DocumentAnalysis table:

```javascript
{
  documentsResult: {
    analysis: {
      forgeryFlags: ['FONT_INCONSISTENCY', ...]
    },
    exifAnalysis: {
      flags: ['EDITED_IN_PHOTOSHOP', ...]
    },
    qrVerification: {
      flags: ['QR_NOT_FOUND', ...],
      flagDetails: [
        {
          flag: 'QR_NOT_FOUND',
          label: 'No QR code detected',
          severity: 'CRITICAL',
          explanation: '...'
        }
      ]
    }
  }
}
```

---

## Testing the New Display

1. **Upload Aadhaar without QR**
   - Should see: `🔴 QR_NOT_FOUND`
   - Severity: CRITICAL

2. **Upload Aadhaar edited in Photoshop**
   - Should see: `🟠 EDITED_IN_PHOTOSHOP`
   - Severity: HIGH

3. **Upload Genuine Aadhaar**
   - Should see: No flags (clean)
   - Severity: None

---

## Summary

✅ **Clear** - Each flag explained in plain English  
✅ **Specific** - Know which detector found it  
✅ **Actionable** - Severity shows what to do  
✅ **Complete** - All flags from all sources  

**Officers no longer see:**
- ❌ "Flags: 3" (what 3?)
- ❌ Just technical codes (what do they mean?)
- ❌ Scattered information (where's the QR data?)

**Officers now see:**
- ✅ "🚨 All Detected Issues (3 flags)"
- ✅ Each flag with color, explanation, source
- ✅ Clear recommendation (APPROVE/REVIEW/REJECT)
