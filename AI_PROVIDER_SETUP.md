# AI Provider Configuration

This document explains how to switch between Claude (Anthropic) and Gemini (Google) for document extraction.

## Quick Start

### Option A: Claude (Default)

```bash
# backend/.env
AI_PROVIDER=claude
ANTHROPIC_API_KEY=sk-ant-...
CLAUDE_MODEL=claude-opus-4-6
```

Get your key: https://console.anthropic.com/

### Option B: Gemini

```bash
# backend/.env
AI_PROVIDER=gemini
GEMINI_API_KEY=AIzaSy...
GEMINI_MODEL=gemini-2.5-pro  # or gemini-2.5-flash for cheaper
```

Get your key: https://aistudio.google.com/app/apikey (free tier available)

## Architecture

The abstraction lives in `backend/src/services/ai/`:

| File | Purpose |
|---|---|
| `index.js` | Dispatcher; validates provider at startup |
| `prompts.js` | Shared extraction prompts (both providers use identical text) |
| `claude.js` | Claude implementation (Anthropic SDK) |
| `gemini.js` | Gemini implementation (Google SDK) |

Each provider file exports `extractDocument(buffer, mimeType, docType)` with the same signature.

## How It Works

1. **On server startup** (`backend/src/server.js`):
   - Calls `aiProvider.validateProvider()` which checks `AI_PROVIDER` env var and required API keys.
   - Logs which provider is active: `✓ AI Provider: CLAUDE` or `✓ AI Provider: GEMINI`.

2. **During document analysis** (`backend/src/services/documentAnalysisService.js`):
   - `analyzeDocument()` preprocesses images (resize, normalize, sharpen).
   - Calls `aiProvider.extractDocument()`, which routes to the active provider.
   - Returns `{ extracted: {...}, analysis: {...} }` in the same shape regardless of provider.

3. **Forensic pipeline** (unchanged):
   - Aadhaar QR verification, EXIF analysis, PAN validation, cross-checks all work with either provider.
   - Risk scoring is provider-agnostic.

## Provider Differences

| Aspect | Claude | Gemini |
|---|---|---|
| SDK | `@anthropic-ai/sdk` | `@google/generative-ai` |
| Free tier | None | Yes, generous limits |
| JSON output | Prompt-based + regex strip | Native `responseMimeType: 'application/json'` |
| Document types | Image (preprocessed) + PDF | Image + PDF (native) |
| Cost | Higher | Flash is ~10× cheaper |
| Rate limits | Per-tier | Generally higher on free |

## Adding a New Provider

1. Create `backend/src/services/ai/newprovider.js`:
   ```javascript
   async function extractDocument(buffer, mimeType, documentType) {
     // Your implementation here
     return { extracted: {...}, analysis: {...} };
   }
   module.exports = { extractDocument };
   ```

2. Update `backend/src/services/ai/index.js`:
   ```javascript
   const newProvider = require('./newprovider');
   // ... in validateProvider():
   if (AI_PROVIDER === 'newprovider' && !process.env.NEWPROVIDER_API_KEY) {
     throw new Error('NEWPROVIDER_API_KEY is required...');
   }
   // ... in extractDocument():
   if (AI_PROVIDER === 'newprovider') {
     return newProvider.extractDocument(...);
   }
   ```

3. Add env vars to `backend/.env`:
   ```bash
   AI_PROVIDER=newprovider
   NEWPROVIDER_API_KEY=...
   ```

## Testing

Restart the backend to apply `.env` changes:

```bash
cd backend
npm run dev
```

Watch the startup logs — you should see:
```
✓ AI Provider: CLAUDE
```
or
```
✓ AI Provider: GEMINI
```

If the provider isn't initialized correctly, the server will exit with a clear error message.

## Debugging

- **Invalid AI_PROVIDER**: Check `.env` — must be `claude` or `gemini` (lowercase).
- **Missing API key**: Check the error on startup; add the appropriate `*_API_KEY` to `.env`.
- **Provider calls failing**: Check worker logs (`docker compose logs -f api-app`). Each provider logs its own error style.
