# Build-from-scratch Prompt

This is the spec-style prompt that, given to an agentic coding assistant with
no prior context, would reproduce this repository. Keep it in sync if the
architecture changes materially.

---

## Full prompt

> **Build a loan fraud detection system for KYC document verification.**
>
> ### Problem
> Indian banks/NBFCs lose money on fraudulent personal loans where applicants submit forged or tampered Aadhaar cards, PAN cards, ITR documents, and employment letters. A human loan officer can't reliably spot Photoshopped documents at scale. Build a system that lets a loan officer create a loan application, upload the applicant's 4 KYC documents, and get back an **evidence-backed fraud verdict** — not just "AI says it looks fake." The officer takes the final decision; the system gives them the proof to decide with.
>
> ### Core design principle: "proof, not vibes"
> Combine two **independent** verification layers and trust the deterministic one more than the AI one:
> 1. **AI extraction layer (Claude Vision)** — OCRs the document, extracts structured fields (name, DOB, UID, PAN number, income, employer, etc.), flags visible forgery indicators (font mismatch, alignment, template anomalies), returns a per-document authenticity score.
> 2. **Deterministic forensics layer** — runs hard checks the AI can't be trusted with:
>    - **Aadhaar QR signature decode** (`jsqr`) — extract the embedded XML/secure-QR payload, cross-check it against the OCR fields. Mismatch → `QR_OCR_MISMATCH`. No QR found on a card that should have one → flag.
>    - **EXIF metadata analysis** (`exifr`) — look for editor software signatures (`EDITED_IN_PHOTOSHOP`, `EDITED_IN_GIMP`), capture date anomalies, missing camera metadata on a "photograph."
>    - **PAN structure validator** — regex `[A-Z]{5}[0-9]{4}[A-Z]`, fourth-character entity-type check (`P` for individual), checksum-style validation.
>    - **Cross-document checks** — same applicant name across PAN/Aadhaar/ITR/Employment letter (fuzzy match), DOB consistency, declared income vs ITR income within tolerance, employer name on letter matches Form 16 employer.
>
> Every risk point in the final score must be **traceable to a named flag**. The officer should see the flag list, not just a number.
>
> ### Risk model
> - Score 0–100, computed by **summing weighted contributions** from each verifier (per-doc Claude authenticity penalty, EXIF flag penalties, QR mismatch penalty, cross-check failure penalties).
> - **Fail-closed**: if a verifier crashes or returns nothing, treat as failure (add risk), don't silently pass.
> - Map score → recommendation via configurable thresholds: `< RISK_THRESHOLD_REVIEW (40)` → `APPROVE`, `< RISK_THRESHOLD_REJECT (70)` → `MANUAL_REVIEW`, else `REJECT`. Also emit `riskLevel` (`LOW` / `MEDIUM` / `HIGH` / `CRITICAL`).
> - Persist every flag, every extracted field, every verifier output for audit.
>
> ### Tech stack (use these — non-negotiable)
> | Layer | Stack |
> |---|---|
> | Backend | Node.js (≥20) + Express + Bull (Redis-backed queues) + Socket.io |
> | AI | Anthropic Claude Vision API (`@anthropic-ai/sdk`), env-configurable model |
> | Forensics | `jsqr`, `exifr`, `sharp` for image normalization |
> | Storage | Google Cloud Storage (real GCP in prod, `fake-gcs-server` locally — controlled by `STORAGE_EMULATOR_HOST` env) |
> | DB | YugabyteDB (PostgreSQL-compatible, port 5413) via Prisma ORM |
> | Frontend | React + Vite + `axios` + `socket.io-client`, no React Router (URL-driven micro-router using `pushState` + `popstate`) |
> | Local infra | `docker-compose.yml` for YugabyteDB + Redis + fake-gcs + Bull Board |
>
> ### Data model (Prisma)
> - `Loan` — id, applicationNumber, applicantName, applicantPhone, applicantEmail, loanAmountRequested, loanType (enum: PERSONAL/HOME/VEHICLE/BUSINESS/EDUCATION/GOLD), status (PENDING/UNDER_REVIEW/APPROVED/REJECTED/DISBURSED), analysisStatus (NOT_STARTED/QUEUED/PROCESSING/COMPLETED/FAILED), currentRiskScore, recommendation, branchCode, officerId, timestamps.
> - `Document` — id, loanId, docType (AADHAAR/PAN/ITR/EMPLOYMENT_LETTER), gcsObjectKey, mimeType, fileSize, uploadedAt.
> - `DocumentAnalysis` — id, documentId, claudeAnalysis (JSON), exifAnalysis (JSON), qrVerification (JSON), authenticityScore, forgeryFlags (string[]), extractedFields (JSON), processingTimeMs.
> - `LoanAnalysis` — id, loanId, riskScore, riskLevel, recommendation, documentsResult (JSON keyed by docType), crossChecks (JSON array of `{name, pass, detail}`), processingTimeMs.
> - `FraudFlag` — id, loanId, code, severity, evidence (JSON), resolvedAt, resolvedBy.
> - `AuditLog` — every state change with actor + before/after.
>
> ### Backend API (REST + WS)
> Mount under `/api`. Officer identity via `x-officer-id` header. Return JSON.
>
> - `POST /loans` — create application. Returns `Loan`.
> - `GET /loans?limit&offset&status&riskMin&riskMax` — paginated list with current risk + analysis status.
> - `GET /loans/:id` — full detail including documents + analysis.
> - `POST /loans/:id/decision` — body `{ decision: APPROVE|REJECT|ESCALATE, reason }`. Audited.
> - `POST /loans/:id/documents` — `multipart/form-data` with file slots `aadhaar`, `pan`, `itr`, `employmentLetter`. Streams to GCS, enqueues a Bull job per document, then a "finalize" job that runs cross-checks once all docs are analyzed.
> - `GET /loans/:id/analysis` — current `LoanAnalysis` + per-doc results + document metadata. Used by the frontend to hydrate after page reload.
> - `GET /documents/:docId/file` — **streaming proxy** that pipes the GCS `ReadStream` through Express. Avoids signed-URL / CORS pain with the emulator. Used by frontend for thumbnails.
> - `GET /fraud/flags?status=open` and `POST /fraud/flags/:id/resolve`.
> - `GET /stats/dashboard` — counts by status, avg risk, top flag codes.
> - **Socket.io** — emit `analysis:progress` (`{ loanId, stage, percent }`) and `analysis:complete` (`{ loanId, riskScore, recommendation }`) so the frontend can show live progress without polling.
>
> ### Worker pipeline (Bull)
> Two queues: `document-analysis` (per-doc) and `loan-finalize` (per-loan).
>
> Per-document job:
> 1. Download GCS object → Buffer (do not pass `gs://` URLs into `sharp` — it'll fail).
> 2. Run forensic verifiers in parallel: Claude Vision call, EXIF, QR (Aadhaar only), PAN structural (PAN only).
> 3. Persist `DocumentAnalysis`.
> 4. Emit `analysis:progress`.
> 5. If all sibling docs for the loan are done, enqueue `loan-finalize`.
>
> Finalize job:
> 1. Run cross-document checks.
> 2. Compute risk score, recommendation, riskLevel.
> 3. Persist `LoanAnalysis`, generate `FraudFlag` rows.
> 4. Update `Loan.analysisStatus = COMPLETED`, `currentRiskScore`, `recommendation`.
> 5. Emit `analysis:complete`.
>
> ### Frontend UX — banking-grade, evidence-first
>
> **Page 1: Loan list (landing)**
> - Table of all loans: application #, applicant + phone, type, amount, AI analysis status pill, risk score pill (color-coded: green <40, amber <70, red ≥70), recommendation pill, created date.
> - "+ Create Loan" button opens a modal (name, phone, email, amount, type, branch code) → POST `/loans` → automatically opens the new loan's dashboard.
> - Rows are clickable; clicking opens the analysis dashboard.
> - Auto-refresh every 15s so in-flight analyses update live.
>
> **Page 2: Document verification dashboard**
> URL: `?loanId=<uuid>`. Sections top-to-bottom:
> 1. **Header** — back link to list, loan id, risk level badge (top-right) once analysis is done.
> 2. **Upload panel** — 4 file slots (Aadhaar, PAN, ITR, Employment Letter) + "Run AI verification" button. **Collapses to a one-line summary** once an analysis result exists; "Reset" button to re-upload.
> 3. **Hero** — big risk score gauge (0–100, color-coded), recommendation badge (APPROVE/MANUAL REVIEW/REJECT with ✓/⚠/✗), quick stats: docs analyzed, total flags, cross-checks passed/total, processing time.
> 4. **Risk score breakdown** — horizontal stacked bar showing each contribution (per-doc Claude penalty, EXIF flags, QR mismatch, cross-check failures), each with a label and weight.
> 5. **Per-document insight cards** (one per doc) — thumbnail (image preview or PDF chip via `/documents/:docId/file`), authenticity score, extracted fields key/value list, list of forgery flags with severity, EXIF flag list, QR verification result (for Aadhaar).
> 6. **Cross-check panel** — table of every cross-document check: name, pass/fail, detail (e.g., "PAN name 'RAJESH KUMAR' matches Aadhaar name 'Rajesh Kumar' (fuzzy 0.95)").
> 7. **Analysis timeline** — chronological log from `AuditLog`.
> 8. **Raw analysis drawer** — collapsible JSON drawer with the full `analysis` + `documents` payload, for officers/auditors who want to inspect raw data.
> 9. **Decision bar** — three buttons: Approve / Reject / Escalate. Calls `POST /loans/:id/decision`.
>
> Use a **`useLoanAnalysis(loanId)` hook** that:
> - Fetches initial state from `GET /loans/:id/analysis`.
> - Subscribes to Socket.io progress + complete events for that loanId.
> - Exposes `{ status, progress, analysis, documents, error, uploadDocuments, reset }`.
>
> ### Local dev experience
> - `docker compose up -d` brings up YugabyteDB (5413), Redis (6379), fake-gcs (4443), Bull Board (3002).
> - Document a one-curl bucket-creation step (`POST http://localhost:4443/storage/v1/b?project=loan-fraud-local` with `{"name":"fraud_documents_fyn"}`).
> - `backend/.env.example` with every var (`ANTHROPIC_API_KEY`, `CLAUDE_MODEL`, `DATABASE_URL`, `REDIS_HOST`, `STORAGE_EMULATOR_HOST`, `GCS_BUCKET_NAME`, `RISK_THRESHOLD_*`).
> - Postman collection at `postman/` with a "Demo Flow" folder: create loan → upload docs → poll analysis → get detail → approve. Auto-wire `loanId` between requests via test scripts.
>
> ### Non-goals (don't build)
> - User auth / login UI (officer id is just a header for now).
> - PDF generation / email notifications.
> - Mobile app.
> - Pluggable verifier registry — wire the 4 verifiers directly, no over-abstraction.
>
> ### Deliverables
> 1. Working `docker-compose.yml` + `backend/` + `frontend/` + `postman/`.
> 2. `README.md` covering: what it is, architecture table, prerequisites, 6-step setup, smoke test, troubleshooting table.
> 3. One end-to-end happy path that runs locally: create loan → upload 4 sample docs → see live progress → land on the dashboard with risk score, breakdown, per-doc cards, cross-checks, and an APPROVE/REJECT button.
>
> Start by scaffolding the Prisma schema and the backend route surface, then the worker pipeline, then the frontend. Ask before installing new dependencies. Don't add features I didn't ask for.

---

## Short version

For quick reuse when the full spec is overkill:

> Build a loan fraud detection web app. A loan officer creates a loan application, uploads 4 KYC docs (Aadhaar, PAN, ITR, employment letter), and gets back a risk score + APPROVE / MANUAL_REVIEW / REJECT recommendation backed by both Claude Vision (OCR + forgery reasoning) and **deterministic forensics** (Aadhaar QR via `jsqr`, EXIF via `exifr`, PAN structure, cross-document name/income/employer checks). Stack: Node + Express + Bull/Redis + Prisma + YugabyteDB on the backend, React + Vite + Socket.io on the frontend, GCS for storage with `fake-gcs-server` for local. Two pages: a loan list (with "create loan" modal) and an analysis dashboard (risk gauge, score breakdown, per-doc insight cards with thumbnails, cross-check panel, raw JSON drawer, decision buttons). Include `docker-compose.yml`, a Postman collection, and a setup README. Don't add auth, don't over-abstract verifiers.

---

## Load-bearing constraints

These lines in the prompt are doing the heavy lifting. Removing any of them produces a noticeably different app:

| Constraint | What it prevents |
|---|---|
| "proof, not vibes" + two independent layers | An "ask Claude, return its verdict" toy |
| Fail-closed risk model | "If unsure, approve" default behavior |
| Explicit tech stack table | Drift to MongoDB / Next.js / Firebase |
| Streaming proxy for documents | Signed URLs that don't work against the emulator |
| Upload panel collapses after a result | Giant upload form sitting above the insights |
| Raw analysis drawer | UI that hides the JSON behind a "trust the gauge" verdict |
| Non-goals list | Over-engineering (auth, plugin systems) burning the budget |
| "Ask before installing new dependencies" | Uninvited React Router / Redux / Zustand additions |
