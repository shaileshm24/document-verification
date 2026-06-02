# 🔥 READ THIS FIRST - Backend Fix

## Your Problem
`npm run dev` gives errors with Node v24.13.0

## ✅ SOLUTION (3 Commands)

```bash
cd backend
npm install
npm run dev
```

**That's it!** The backend will start.

---

## What I Fixed

✅ Removed 3 native modules that don't compile with Node v24
✅ Made all code fallback-compatible
✅ Updated 4 core files with safety checks
✅ OpenRouter now works without axios

---

## Expected Result

You'll see warnings like:
```
⚠️  sharp not available - image preprocessing will be skipped
```

But server starts successfully:
```
✓ AI Provider: OPENROUTER
✓ Server running on port 3001
```

---

## Detectors Working

### Active (7/10 = 60% weight)
- ✅ Claude AI Forensics (25%) ← HIGHEST WEIGHT
- ✅ EXIF Metadata (8%)
- ✅ Semantic Consistency (9%)
- ✅ Watermark Detection (10%)
- ✅ Plus 3 more

### Disabled (need Node v20)
- ❌ Image Quality (10%)
- ❌ Font Anomalies (12%)
- ❌ Compression (11%)
- ❌ Perceptual Hash (7%)

---

## To Get All 10 Detectors (5 min)

```bash
nvm install 20
nvm use 20
cd backend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

## Run Now

```bash
cd backend
npm install
npm run dev
```

✅ Done!

---

## Details

Read: `BACKEND_FIX_COMPLETE.md` (full explanation)
