# ✅ Testing Checklist - QR Debug & Flag Display

## Pre-Testing Setup

- [ ] Backend running: `cd backend && npm run dev`
- [ ] Frontend running: `cd frontend && npm run dev` (in another terminal)
- [ ] Can access http://localhost:5173
- [ ] Can create new loan via API or UI

---

## Test 1: QR Detection Logging ✓

**What to test:** Logging appears when QR detection runs

**Steps:**
1. Watch backend console
2. Upload Aadhaar document
3. Click "Run AI Verification"
4. Look for logs starting with `🔍 [QR Detection]`

**Expected output:**
```
🔍 [QR Detection] Starting QR decode from image buffer...
  📐 Strategy 1: Trying width 1600px with inversion...
    ✓ Image resized to 1600x2400
    ✗ No QR found at width 1600
  📐 Strategy 1: Trying width 2400px with inversion...
    ✓ Image resized to 2400x3600
    ✗ No QR found at width 2400
  ...
❌ [QR Detection] No QR code found after all strategies
```

**Verdict:**
- [ ] Logs appear ✅
- [ ] Shows each strategy attempted
- [ ] Shows final result
- [ ] If QR exists, note which width detects it

---

## Test 2: QR Verification Logging ✓

**What to test:** Detailed verification logs appear

**Steps:**
1. Watch backend console
2. After uploading document
3. Look for logs starting with `📋 [QR Verification]`

**Expected output:**
```
📋 [QR Verification] Starting Aadhaar QR verification...
⚠️  [QR Verification] QR not found - marking as NOT_FOUND
✅ [QR Verification] Complete. Flags: QR_NOT_FOUND
```

**Verdict:**
- [ ] Verification logs appear ✅
- [ ] Shows whether QR found or not
- [ ] Shows final flags list

---

## Test 3: Frontend Flag Display ✓

**What to test:** "🚨 All Detected Issues" section shows on frontend

**Steps:**
1. Upload an Aadhaar document
2. Wait for analysis to complete
3. Scroll down on results
4. Look for section titled "🚨 All Detected Issues"

**Expected display:**
```
🚨 All Detected Issues (X flags)
[Summary showing total count]

🔴 Flag 1 with explanation...
🟠 Flag 2 with explanation...
🟡 Flag 3 with explanation...
```

**Verdict:**
- [ ] Section appears after analysis ✅
- [ ] Shows total flag count
- [ ] Each flag has severity color (🔴🟠🟡)
- [ ] Each flag has human-readable explanation
- [ ] Each flag shows source (AI/QR/EXIF)

---

## Test 4: QR Flag Details ✓

**What to test:** When QR not found, detailed explanation shows

**Steps:**
1. Upload Aadhaar WITHOUT visible QR code
2. Wait for analysis
3. Scroll to "UIDAI QR Verification" section
4. Look for enhanced error message

**Expected:**
- [ ] "QR Not Found" pill appears 🔴
- [ ] Detailed explanation below it
- [ ] flagDetails section shows below
- [ ] Each detail has explanation

**Verdict:**
- [ ] QRBlock shows detailed error ✅
- [ ] User understands why QR missing
- [ ] User understands why it matters

---

## Test 5: Flag Aggregation ✓

**What to test:** Flags from multiple sources all appear together

**Steps:**
1. Upload document with multiple issues
   - (Use a photoshopped Aadhaar if available)
2. Wait for analysis
3. Check "All Detected Issues" section

**Expected flags to appear:**
- [ ] AI-detected flags (from Claude)
- [ ] QR-related flags (from QR verification)
- [ ] EXIF-related flags (from metadata)

**Verdict:**
- [ ] All sources represented ✅
- [ ] No duplicates (each flag appears once)
- [ ] Each shows correct source
- [ ] Count matches actual findings

---

## Test 6: Severity Color Coding ✓

**What to test:** Flags color-coded by severity (red/orange/yellow)

**Steps:**
1. Upload document with mixed issues
2. Look at "All Detected Issues" section
3. Verify colors match severity

**Expected:**
- [ ] 🔴 Red = CRITICAL (QR missing)
- [ ] 🟠 Orange = HIGH (Photoshop, mismatch)
- [ ] 🟡 Yellow = MEDIUM (No EXIF)

**Verdict:**
- [ ] Color coding works ✅
- [ ] Severity matches color
- [ ] Officer can quickly identify critical vs minor

---

## Test 7: QR Detection with Real QR ✓

**What to test:** If QR IS in image, does it detect it?

**Steps:**
1. Upload Aadhaar WITH visible QR
2. Check backend logs
3. Note at which width QR detected
4. Check if QR_NOT_FOUND flag appears

**Expected:**
- One of these should appear:
  ```
  ✅ QR FOUND at width 2400! Data length: 128
  or
  ✓ Image resized to 2400x3600
  ...
  ✅ QR FOUND with contrast enhancement!
  ```

**Verdict:**
- [ ] QR detected (note which width) ✅
- [ ] QR_NOT_FOUND flag NOT in results
- [ ] QR data appears in QRBlock

**If QR not detected despite being visible:**
- [ ] Try other test images
- [ ] Note image dimensions
- [ ] May need to adjust SCAN_WIDTHS
- [ ] See QR_DEBUG_AND_FLAGS_FIX.md for solutions

---

## Test 8: Database Storage ✓

**What to test:** All flags saved to database

**Steps:**
1. Upload document and analyze
2. Check database: DocumentAnalysis table
3. Find the record
4. Check documentsResult field

**Expected JSON structure:**
```javascript
{
  documentsResult: {
    analysis: {
      forgeryFlags: [...]
    },
    exifAnalysis: {
      flags: [...]
    },
    qrVerification: {
      flags: [...],
      flagDetails: [...]
    }
  }
}
```

**Verdict:**
- [ ] Flags stored in database ✅
- [ ] All sources represented
- [ ] flagDetails included
- [ ] Can retrieve later

---

## Test 9: Multiple Documents ✓

**What to test:** Works for all 4 document types

**Steps:**
1. Upload Aadhaar → check flags appear
2. Upload PAN → check flags appear
3. Upload ITR → check flags appear
4. Upload Employment Letter → check flags appear

**Expected:**
- All should show "🚨 All Detected Issues" section
- All should show aggregated flags
- All should store results in DB

**Verdict:**
- [ ] Aadhaar works ✅
- [ ] PAN works ✅
- [ ] ITR works ✅
- [ ] Employment Letter works ✅

---

## Test 10: Performance ✓

**What to test:** No performance degradation

**Steps:**
1. Time analysis of document before fix
2. Time analysis of same document after fix
3. Compare times

**Expected:**
- Similar or slightly faster (new code is efficient)
- Should complete in 20-30 seconds total

**Verdict:**
- [ ] Performance acceptable ✅
- [ ] No timeouts
- [ ] No hanging requests

---

## Issues Found & Actions

**Issue: QR not detected even though visible**
- [ ] Check backend logs for which width tried
- [ ] Try uploading same image from different source
- [ ] Adjust SCAN_WIDTHS if pattern found
- [ ] See QR_DEBUG_AND_FLAGS_FIX.md

**Issue: Flags not showing on frontend**
- [ ] Check browser console for JavaScript errors
- [ ] Verify API response includes flags
- [ ] Check network tab to see actual response
- [ ] Clear browser cache and reload

**Issue: Wrong flag severity colors**
- [ ] Check aggregateAllFlags() function
- [ ] Verify severity assignments
- [ ] CSS may need adjustment for color display

**Issue: Duplicate flags showing**
- [ ] Check deduplication logic in aggregateAllFlags()
- [ ] Should filter by flag code
- [ ] Likely issue if QR/EXIF/AI all find same issue

---

## Success Criteria

All tests pass when:
- ✅ QR logging shows at every step
- ✅ "All Detected Issues" section appears
- ✅ All flags from all sources shown
- ✅ Color-coded by severity
- ✅ Explanation for each flag
- ✅ Source identified (AI/QR/EXIF)
- ✅ Works for all document types
- ✅ Data saved to database
- ✅ Performance acceptable
- ✅ QR detection improved (or identified exactly why it fails)

---

## Next Steps

**If all tests pass:**
1. ✅ Commit changes
2. ✅ Demo to judges
3. ✅ Note QR findings (which widths work)
4. ✅ Done!

**If some tests fail:**
1. ❌ Check Issues Found section above
2. ❌ Review the two debug docs
3. ❌ Test again
4. ❌ Repeat until all pass

**Expected timeline:**
- 30 mins: Run all tests
- 15 mins: Fix any issues found
- 15 mins: Verify fixes work
- Total: ~1 hour to validate everything

Good luck! 🚀
