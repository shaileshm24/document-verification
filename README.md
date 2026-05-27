# Loan Fraud Detection

AI-powered document verification system for loan applications. Combines **AI Vision** (Claude or Gemini; configured via `AI_PROVIDER`) for OCR + forgery reasoning with **deterministic forensic checks** (Aadhaar QR signature, EXIF metadata, PAN structure, cross-document consistency) to give loan officers evidence-backed fraud verdicts on Aadhaar, PAN, ITR, and employment letters.

## Architecture

| Layer    | Stack |
|----------|-------|
| Frontend | React + Vite + Socket.io client |
| Backend  | Node.js + Express + Bull (Redis queues) + Socket.io |
| AI       | Anthropic Claude OR Google Gemini (configurable via `AI_PROVIDER=claude\|gemini`) |
| Forensics| `jsqr` (Aadhaar QR), `exifr` (EXIF), custom PAN validator |
| Storage  | Google Cloud Storage (real) / `fake-gcs-server` (local) |
| Database | YugabyteDB (PostgreSQL-compatible) via Prisma |

## Prerequisites

- Node.js ≥ 20
- Docker + Docker Compose
- **One of:**
  - An Anthropic API key — https://console.anthropic.com/ (for Claude)
  - A Google Gemini API key — https://aistudio.google.com/app/apikey (for Gemini)

## Setup

### 1. Clone

```bash
git clone <repo-url> loan-fraud-detection
cd loan-fraud-detection
```

### 2. Start infrastructure (YugabyteDB, Redis, fake-GCS, Bull Board)

```bash
docker compose up -d
docker compose ps        # wait until all containers are healthy (~60s on first start)
```

Services exposed:

| Service           | Port  | URL                                  |
|-------------------|-------|--------------------------------------|
| YugabyteDB YSQL   | 5413  | `postgresql://loanuser:loanpass123@localhost:5413/loan_fraud_db` |
| YugabyteDB Admin  | 15433 | http://localhost:15433               |
| Redis             | 6379  | —                                    |
| Fake GCS          | 4443  | http://localhost:4443                |
| Bull Board (queue)| 3002  | http://localhost:3002                |

### 3. Create the GCS bucket in fake-gcs

```bash
curl -X POST -H "Content-Type: application/json" \
  http://localhost:4443/storage/v1/b?project=loan-fraud-local \
  -d '{"name":"fraud_documents_fyn"}'
```

### 4. Backend — environment

Create `backend/.env`:

```bash
# AI Provider — choose one:
# Option A: Claude (Anthropic)
AI_PROVIDER=claude
ANTHROPIC_API_KEY=sk-ant-...
CLAUDE_MODEL=claude-opus-4-6           # or claude-sonnet-4-5 if your key lacks Opus access

# Option B: Gemini (Google) — uncomment to use instead of Claude
# AI_PROVIDER=gemini
# GEMINI_API_KEY=AIzaSy...
# GEMINI_MODEL=gemini-2.5-pro           # or gemini-2.5-flash for cheaper/faster

# Server
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Database (matches docker-compose)
DATABASE_URL=postgresql://loanuser:loanpass123@localhost:5413/loan_fraud_db

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Storage — point at the local fake-gcs emulator
GCP_PROJECT_ID=loan-fraud-local
GCS_BUCKET_NAME=fraud_documents_fyn
STORAGE_EMULATOR_HOST=http://localhost:4443

# Risk thresholds
RISK_THRESHOLD_REJECT=70
RISK_THRESHOLD_REVIEW=40
RISK_THRESHOLD_AUTO_REPORT=90
```

> For real GCP: leave `STORAGE_EMULATOR_HOST` unset and set `GOOGLE_APPLICATION_CREDENTIALS=/path/to/sa-key.json`.

### 5. Backend — install, migrate, run

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate deploy        # runs the bundled migration on YugabyteDB
npm run dev                      # starts API + worker on http://localhost:3001
```

You should see `Server listening on 3001` and `Worker queues ready`.

### 6. Frontend — install and run

```bash
cd ../frontend
npm install
npm run dev                      # http://localhost:5173
```

The frontend defaults to `VITE_API_URL=http://localhost:3001/api`. Override by creating `frontend/.env`:

```bash
VITE_API_URL=http://localhost:3001/api
VITE_WS_URL=http://localhost:3001
```

## Smoke test

1. Open http://localhost:5173 — the dashboard loads with the default demo loan ID.
2. To create a fresh loan, POST `http://localhost:3001/api/loans` (see Postman collection) and open `http://localhost:5173/?loanId=<new-id>`.
3. Drop sample documents into the upload tiles and click **Run AI verification**.
4. Watch the progress bar, then inspect risk breakdown, per-document insights, cross-checks, raw JSON drawer, and decide.

## Postman

Ready-to-use collection lives at `postman/`:

```
postman/loan-fraud-detection.postman_collection.json
postman/local.postman_environment.json
```

Import both into Postman, pick the **Local** environment, and run the **Demo Flow** folder top-to-bottom.

## Common scripts

```bash
# Backend
cd backend
npm run dev            # API + worker with hot reload
npm run db:migrate     # prisma migrate dev
npm run db:generate    # regenerate Prisma client

# Frontend
cd frontend
npm run dev            # vite dev server
npm run build          # production bundle to dist/
```

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| `bucket fraud_documents_fyn does not exist` | Re-run the curl in step 3 |
| `Claude 401 / model not found` | Check `ANTHROPIC_API_KEY`; try `CLAUDE_MODEL=claude-sonnet-4-5` |
| `Port 3001/5173/5413/6379 already in use` | `lsof -i :<port>` and stop the conflicting process |
| Frontend can't reach API | Confirm backend is running and `VITE_API_URL` matches |
| `sharp` errors reading `gs://` URLs | Restart the backend — newer code downloads to Buffer first |
| YugabyteDB unhealthy on first start | Wait 60s; check `docker compose logs yugabyte` |
