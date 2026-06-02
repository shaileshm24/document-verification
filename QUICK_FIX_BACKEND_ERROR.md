# 🔧 Backend Error Fix - Node v24.13.0 Compatibility

## Problem

Your backend won't start with two errors:

1. **`Cannot find module 'axios'`** - The OpenRouter integration requires axios
2. **Sharp compilation errors** - Native modules (sharp, sharp-phash, tesseract.js) can't compile with Node v24.13.0

## Solution

### Option 1: Use Older Node Version (Recommended - 5 minutes)

Downgrade to Node v20 (LTS), which has full C++ compatibility:

```bash
# Using NVM
nvm install 20
nvm use 20
node --version  # Should show v20.x.x

# Or using Homebrew
brew install node@20
```

Then install dependencies:

```bash
cd backend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

### Option 2: Skip Native Modules (Quick - 2 minutes)

If you can't change Node version, we've already modified the code to work without axios. Now comment out the problematic native modules:

**Edit `backend/package.json`** - Comment out these lines:

```json
// "sharp": "^0.34.5",           // ← Comment out
// "sharp-phash": "^0.2.1",      // ← Comment out
// "tesseract.js": "^5.0.4",     // ← Comment out
```

Then:

```bash
cd backend
rm -rf node_modules package-lock.json
npm install --omit=optional
npm run dev
```

**Impact**: Disables image enhancement, perceptual hash, and font detection detectors. System will still work with 7/10 detectors.

---

### Option 3: Use Docker (Most Reliable - 10 minutes)

Use a Node v20 container:

```bash
docker run -it --rm \
  -v $(pwd)/backend:/app \
  -w /app \
  -p 3001:3001 \
  node:20-alpine \
  sh -c "npm install && npm run dev"
```

---

## What Was Changed

### OpenRouter now works WITHOUT axios:

✅ **Modified**: `backend/src/services/ai/openrouter.js`
- Uses Node's native `https` module as fallback
- Falls back automatically if axios isn't installed
- Same functionality, no dependency issues

### Code handles both cases:

```javascript
// Tries to use axios if available
let axios;
try {
  axios = require('axios');
} catch (e) {
  axios = null;  // Falls back to https module
}
```

---

## Recommended Path Forward

### Best: Use Node v20

```bash
nvm use 20
cd backend
npm install
npm run dev
```

✅ All features work
✅ All detectors enabled (10/10)
✅ Full image enhancement
✅ Zero breaking changes

### If stuck with Node v24:

1. Comment out sharp-related packages in package.json
2. Run `npm install --omit=optional`
3. System uses 7/10 detectors (EXIF, Quality, Claude, Semantic, Watermark, Frequency, Metadata)
4. No image enhancement or font detection

---

## Testing After Fix

Once running, test with:

```bash
# Check server started
curl http://localhost:3001/health

# Upload test document
# Frontend should work normally
```

---

## Environment Check

Verify your setup:

```bash
node --version      # Should be v20.x or v18.x
npm --version       # Should be v10+
cd backend && npm list axios  # Check if axios installed
```

---

## Summary

| Option | Time | All Features | Easy |
|--------|------|--------------|------|
| **Node v20** | 5 min | ✅ Yes | ✅ Yes |
| **Skip Modules** | 2 min | ⚠️ Partial | ✅ Yes |
| **Docker** | 10 min | ✅ Yes | ⚠️ Advanced |

**Recommendation: Use Node v20** (5 minutes, all features work)

---

## Verify Everything Works

```bash
cd backend
npm run dev
```

Expected output:

```
✓ AI Provider: OPENROUTER (or CLAUDE/GEMINI)
✓ Server running on port 3001
✓ Database connected
✓ Redis connected
```

Then upload a document via frontend and check logs show analysis complete.

---

## Still Having Issues?

Share the error output from `npm run dev` and we'll debug further.
