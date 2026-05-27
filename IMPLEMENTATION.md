# Implementation Notes

A reference for what's actually in this codebase and how a request flows through it. Pairs with `README.md` (setup) and `PROMPT.md` (rebuild spec).

## 1. What the app does

A loan officer creates a loan application, uploads 4 KYC documents (Aadhaar, PAN, ITR, employment letter), and gets back an evidence-backed risk verdict — score 0–100, recommendation (APPROVE / MANUAL_REVIEW / REJECT), per-document insights, and cross-document validation results. The officer takes the final decision; the system supplies the proof.

## 2. Top-level architecture

```
┌────────────────────────────────────────────────────────────────────┐
│ React frontend (Vite, :5173)                                        │
│   • LoanListPage  ─── click row ───►  LoanAnalysisDashboard         │
│   • useLoanAnalysis hook  ◄── Socket.io ───┐                        │
└──────────────────────────────────────────────────┬─────────────────┘
                  REST + WS                        │
┌──────────────────────────────────────────────────▼─────────────────┐
│ Express API (:3001)                                                 │
│   /api/loans          /api/loans/:id/documents/...                  │
│   /api/fraud          /api/stats                                    │
│   Socket.io rooms: loan:<id>                                        │
└─────┬───────────────────┬─────────────────┬────────────────────────┘
      │                   │                 │
      ▼                   ▼                 ▼
┌──────────┐      ┌──────────────┐    ┌─────────────────────────┐
│ Yugabyte │      │ Redis + Bull │    │ Google Cloud Storage    │
│ Postgres │      │   (queues)   │    │ (real GCP or fake-gcs)  │
└──────────┘      └──────┬───────┘    └───────────▲─────────────┘
                         │                        │
                         ▼                        │ stream
                  ┌──────────────┐                │
                  │ Worker (same │  download ─────┘
                  │  Node proc.) │  → Buffer
                  │              │  → Claude Vision  + forensics
                  └──────────────┘
```

The worker runs **in-process** with the API (Bull spawns its own job loop in the same Node process). Helmet's CORP is set to `cross-origin` so the frontend can `<img>`-embed the document-streaming endpoint. The AI provider (Claude or Gemini) is abstracted behind a dispatcher (`services/ai/index.js`) configured by the `AI_PROVIDER` env var.

## 3. End-to-end request flow

1. **List page loads** → `GET /api/loans?limit=50` → table renders. Auto-refresh every 15s for in-flight analyses.
2. **Officer clicks "+ Create Loan"** → modal → `POST /api/loans` with applicant fields → URL switches to `?loanId=<new-id>` → dashboard opens.
3. **Officer drops 4 files + clicks "Run AI verification"** → `POST /api/loans/:id/documents` (multipart). The route:
   - Validates mime (jpeg/png/webp/pdf) + size (≤10MB).
   - Buffers each file in memory (multer `memoryStorage`), uploads to GCS in parallel under `loans/<loanId>/documents/<docType>/<uuid>.<ext>`.
   - Persists a `Document` row per file (stores `s3Key` = GCS path, `s3Url` = public URL — field names predate the GCS migration).
   - Sets `Loan.analysisStatus = QUEUED`, enqueues a single Bull `analyze` job carrying `{ loanId, documentPaths: { aadhaar: "gs://...", pan: "gs://...", ... } }`.
4. **Bull worker picks up the job** (`documentWorker.js`):
   - Flips `analysisStatus → PROCESSING`, emits `analysis:status` (`progress: 10`).
   - For each doc: `loadDocument(gs://...)` → Buffer + mime → preprocess image (resize, normalize, sharpen) → run **AI extraction** (Claude or Gemini, via `services/ai/index.js`) + EXIF in parallel; Aadhaar additionally runs the QR verifier using the AI provider's OCR fields as the cross-reference.
   - After all 4 docs finish, runs `crossValidateDocuments()` → list of `{check, pass, detail}`.
   - Runs `calculateRiskScore()` → `{score, riskLevel, recommendation, factors}`.
   - Persists `DocumentAnalysis` row, updates `Loan` (`currentRiskScore`, `recommendation`, `analysisStatus = COMPLETED`).
   - Emits `analysis:complete` + (if score ≥ 70) a global `fraud:alert` event.
5. **Frontend `useLoanAnalysis(loanId)`** is already subscribed to `loan:<id>` via Socket.io → receives status updates live → re-fetches `GET /api/loans/:id/documents/analysis` on `analysis:complete` → dashboard re-renders with risk gauge, breakdown, per-doc cards, cross-checks, and decision bar.
6. **Officer clicks Approve / Reject / Escalate** → `POST /api/loans/:id/decision` → audited, `LoanDecision` upserted, `Loan.status` updated, `decision:made` event broadcast.

## 4. Verification layers (the 3-layer stack)

| Layer | Code | What it produces |
|---|---|---|
| **AI extraction** (Claude Vision) | `services/documentAnalysisService.js → analyzeDocument()` | `{ extracted: {...}, analysis: { forgeryFlags, authenticityScore, confidence, notes } }` |
| **Aadhaar QR forensics** | `services/verifiers/aadhaarQR.js` | `{ qrFound, qrType, extracted, crossCheck: { checks, mismatches }, flags }` — decodes the UIDAI signed QR via `jsqr` and cross-checks every embedded field against the OCR output |
| **EXIF forensics** | `services/verifiers/exifAnalyzer.js` | `{ flags: ["EDITED_IN_PHOTOSHOP" \| "NO_EXIF_METADATA" \| ...], metadata, summary }` via `exifr` |
| **PAN structural** | `services/verifiers/panValidator.js` | `validatePANFormat()`, `checkPANSurnameMatch()`, `crossCheckPanAadhaar()` — regex + entity-type rules, plus PAN↔Aadhaar name/DOB consistency |
| **Cross-document** | `documentAnalysisService.js → crossValidateDocuments()` | 7 checks: NAME_MATCH, INCOME_CONSISTENCY, PAN_FORMAT_VALID, PAN_SURNAME_RULE, PAN_AADHAAR_*_MATCH, AADHAAR_QR_PRESENT/MATCHES_PRINT, EMPLOYER_GST_VALID, EMPLOYMENT_LETTER_RECENT |

## 5. Risk model (fail-closed)

`calculateRiskScore()` in `documentAnalysisService.js`:

- **Per-document base penalty** = `weight × (1 - authenticityScore)`. Weights: Aadhaar 25, PAN 20, ITR 18, Employment Letter 12 (Aadhaar is the identity anchor).
- **+3 per Claude forgery flag** on that document.
- **+4 per EXIF flag** on that document (Photoshop signature, future timestamp, etc.).
- **+25 if Aadhaar QR not found**, **+30 if QR data mismatches printed text**.
- **Cross-check failures** add fixed penalties from a map (15–30 depending on the check). E.g., PAN-Aadhaar DOB mismatch = +15, QR-vs-print mismatch in the cross-check layer = +30.
- **Fail-closed**: if a document can't be loaded or Claude errors out, the document's full weight is added as a penalty and a `DOCUMENT_UNREADABLE` flag is recorded. No silent passes.

Final mapping (configurable via `RISK_THRESHOLD_*`):

| Score | Level | Recommendation |
|-------|-------|----------------|
| 0–39  | LOW    | APPROVE        |
| 40–69 | MEDIUM | MANUAL_REVIEW  |
| 70+   | HIGH   | REJECT         |

Every penalty is captured in `riskFactors` (persisted on `DocumentAnalysis.riskFactors`) so the UI can render the breakdown and the audit trail.

## 6. Frontend implementation map

| Concern | File |
|---|---|
| URL-driven router (no react-router) | `App.jsx` — uses `pushState` + `popstate`, `?loanId=` flips between pages |
| Loan list + create-loan modal | `pages/LoanListPage.jsx` |
| Verification dashboard shell | `pages/LoanAnalysisDashboard.jsx` |
| Live data + Socket.io | `hooks/useLoanAnalysis.js` — exposes `{ status, progress, analysis, documents, uploadDocuments, reset }` |
| Hero (gauge + recommendation + stats) | `component/InsightHeader.jsx` + `RiskScoreGauge.jsx` |
| Stacked risk breakdown bar | `component/RiskBreakdown.jsx` |
| Per-document card (preview + OCR + flags + EXIF + QR + raw JSON drawer) | `component/DocumentInsightCard.jsx` |
| Cross-check table | `component/CrossCheckPanel.jsx` |
| Audit timeline | `component/AnalysisTimeline.jsx` |
| Toast for high-risk loans | `component/FraudAlertBanner.jsx` |
| All styles | `dashboard.css` (component-style classes prefixed `lfd-`) |

The "Raw Analysis" drawer at the bottom of the dashboard prints the entire `{analysis, documents}` payload; each document card additionally has its own collapsible "View raw OCR response" `<details>` block showing just that document's `{extracted, analysis}` from Claude.

## 7. Document streaming proxy

`GET /api/loans/:loanId/documents/:docId/file` (in `routes/documents.js`) pipes the GCS `ReadStream` through Express. Sets `Content-Type` from the stored mime, `Cache-Control: private, max-age=300`, and `Cross-Origin-Resource-Policy: cross-origin` so the frontend on a different port can `<img>`-embed thumbnails. This is also the URL behind "Open original ↗" links and PDF previews. Avoids GCS signed-URL / CORS complexity, especially with the fake-gcs emulator locally.

## 8. Persistence model (Prisma)

- `LoanApplication` — applicant fields, status, analysisStatus, currentRiskScore, recommendation, officerId, timestamps.
- `Document` — one row per uploaded file; `s3Key` holds the GCS path, `s3Url` the public URL (field names predate the GCS rename — left as-is so migrations don't churn).
- `DocumentAnalysis` — one row per analysis run, with `documentsResult` (full per-doc payload incl. Claude extraction + EXIF + QR), `crossChecks`, `riskFactors`, `riskScore`, `riskLevel`, `recommendation`, `processingTimeMs`.
- `FraudFlag` — generated for high-severity findings.
- `LoanDecision` — upserted on `POST /decision`.

## 9. AI provider abstraction

The extraction logic is decoupled from the AI provider via `backend/src/services/ai/`:

- **`index.js`** — dispatcher. Reads `AI_PROVIDER` env var, validates keys at startup, routes `extractDocument(buffer, mimeType, docType)` to the appropriate provider.
- **`prompts.js`** — shared extraction prompts for all document types. Model-agnostic: both Claude and Gemini use the same prompt text.
- **`claude.js`** — Claude (Anthropic) implementation. Uses `@anthropic-ai/sdk`, `buildClaudeContent()` for image/PDF message blocks, strips Markdown fences from the response.
- **`gemini.js`** — Gemini (Google) implementation. Uses `@google/generative-ai`, `buildGeminiParts()` with `inlineData`, leverages native `responseMimeType: 'application/json'` for JSON output (more reliable than Claude's prompt-based JSON).

**Switching providers** is as simple as changing `AI_PROVIDER=claude|gemini` and providing the appropriate API key (`ANTHROPIC_API_KEY` or `GEMINI_API_KEY`). The rest of the pipeline (forensic verifiers, risk scoring, cross-checks) is provider-agnostic.

**Adding a new provider** (e.g., OpenAI GPT-4V) requires:
1. Create `backend/src/services/ai/openai.js` with the same `extractDocument(buffer, mimeType, docType)` signature.
2. Add a case in `index.js` dispatcher.
3. Add the env var `OPENAI_API_KEY` to `.env`.

## 10. What's intentionally not built (yet)

- Officer auth — `x-officer-id` header only.
- PDF report export / email notifications.
- A pluggable verifier registry — the 4 verifiers are wired directly to keep the code legible.
- Real Aadhaar UIDAI signature verification (we decode the QR payload and cross-check fields, but don't validate the digital signature against UIDAI's public key).
- Multi-tenant separation.

## 11. Quick mental model when debugging

- **Stuck in QUEUED** → Redis or the Bull worker isn't up. Check `docker compose ps redis` and the API server logs for `Bull queue workers initialized`.
- **Document UNREADABLE** → AI extraction call failed (check the worker stderr for which provider errored) or GCS object missing. Usually visible in the per-doc card's error text. Tip: on Gemini free tier, check rate limits; on Claude, check credit balance.
- **Thumbnail broken-image** → CORP / cache. Hard-refresh; confirm `Cross-Origin-Resource-Policy: cross-origin` on the `/file` response.
- **Risk score doesn't update live** → Socket.io room mismatch. The frontend joins `loan:<loanId>`; the worker emits to the same room. Watch the browser console for `subscribed to loan:<id>` and the server logs for the matching emit.
- **AI Provider validation failed on startup** → Missing or invalid `AI_PROVIDER` env var, or missing the API key for the chosen provider. Check `backend/.env` and the startup logs.
