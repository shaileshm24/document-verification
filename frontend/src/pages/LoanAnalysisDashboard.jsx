// frontend/src/pages/LoanAnalysisDashboard.jsx
// Document Verification Dashboard — surfaces every analysis insight produced
// by Claude Vision + Aadhaar QR + EXIF forensics + cross-document validation.

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { useLoanAnalysis, useFraudAlerts } from '../hooks/useLoanAnalysis';
import { FraudAlertBanner } from '../component/FraudAlertBanner';
import { AnalysisTimeline } from '../component/AnalysisTimeline';
import { InsightHeader } from '../component/InsightHeader';
import { DocumentInsightCard } from '../component/DocumentInsightCard';
import { RiskBreakdown } from '../component/RiskBreakdown';
import { CrossCheckPanel } from '../component/CrossCheckPanel';
import '../dashboard.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const DOCUMENT_TYPES = [
  { key: 'aadhaar',          label: 'Aadhaar Card',      icon: '🪪' },
  { key: 'pan',              label: 'PAN Card',          icon: '💳' },
  { key: 'itr',              label: 'ITR Filing',        icon: '📄' },
  { key: 'employmentLetter', label: 'Employment Letter', icon: '🏢' },
];

const STATUS_LABEL = {
  uploading:  'Uploading documents to secure storage…',
  queued:     'Queued for analysis…',
  processing: 'Claude Vision + forensic verifiers running…',
};

export default function LoanAnalysisDashboard({ loanId, onBack }) {
  const [files, setFiles] = useState({});
  const { status, progress, analysis, documents, error, uploadDocuments, reset } = useLoanAnalysis(loanId);
  const { alerts, dismissAlert } = useFraudAlerts();

  const handleFileDrop = useCallback((docType) => (accepted) => {
    setFiles(prev => ({ ...prev, [docType]: accepted[0] }));
  }, []);

  const handleAnalyze = async () => {
    if (Object.keys(files).length === 0) {
      alert('Please attach at least one document.');
      return;
    }
    await uploadDocuments(files);
  };

  const handleReUpload = () => {
    setFiles({});
    reset();
  };

  const handleDecision = async (decision) => {
    try {
      await axios.post(
        `${API_BASE}/loans/${loanId}/decision`,
        { decision, reason: `Officer decision: ${decision}` },
        { headers: { 'x-officer-id': localStorage.getItem('officerId') || 'OFFICER-001' } }
      );
      alert(`Loan marked as ${decision}`);
    } catch (e) {
      alert(`Failed: ${e.response?.data?.error || e.message}`);
    }
  };

  const isRunning = ['uploading', 'queued', 'processing'].includes(status);
  const hasResult = status === 'completed' && analysis;

  return (
    <div className="lfd-app">
      <div className="lfd-container">
        {alerts.map(a => (
          <FraudAlertBanner key={a.id} alert={a} onDismiss={() => dismissAlert(a.id)} />
        ))}

        <div className="lfd-header">
          <div>
            {onBack && (
              <button className="lfd-back-link" onClick={onBack}>← All loans</button>
            )}
            <h1>Document Verification</h1>
            <div className="sub">
              Loan <code>{loanId}</code> · AI extraction + forensic checks + cross-document validation
            </div>
          </div>
          {hasResult && (
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 11, color: 'var(--c-text-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Risk Level
              </div>
              <div style={{ fontSize: 18, fontWeight: 600, marginTop: 2 }}>{analysis.riskLevel}</div>
            </div>
          )}
        </div>

        {/* Upload panel: collapses to a one-line summary once results exist */}
        {hasResult ? (
          <div className="lfd-panel">
            <div className="lfd-upload-summary">
              <div className="files">
                <span style={{ fontSize: 12, color: 'var(--c-text-3)', marginRight: 4 }}>Analyzed:</span>
                {documents.map(d => (
                  <span key={d.id} className="chip">{d.fieldKey || d.type}</span>
                ))}
              </div>
              <button onClick={handleReUpload}>↻ Upload new documents</button>
            </div>
          </div>
        ) : (
          <div className="lfd-panel">
            <div className="lfd-panel-head">
              <h2>Upload documents</h2>
              <span className="meta">JPEG / PNG / WebP / PDF · max 10 MB each</span>
            </div>

            <div className="lfd-upload-grid">
              {DOCUMENT_TYPES.map(doc => (
                <DocumentDropzone
                  key={doc.key}
                  docType={doc}
                  file={files[doc.key]}
                  onDrop={handleFileDrop(doc.key)}
                  disabled={isRunning}
                />
              ))}
            </div>

            <button className="lfd-btn" onClick={handleAnalyze} disabled={isRunning}>
              {status === 'idle' && '🔍 Run AI verification'}
              {status === 'uploading' && '⬆ Uploading…'}
              {status === 'queued' && '⏳ Queued…'}
              {status === 'processing' && `🤖 Analyzing… ${progress}%`}
              {status === 'error' && '⚠ Retry'}
            </button>

            {isRunning && (
              <>
                <div className="lfd-progress"><div className="bar" style={{ width: `${progress}%` }} /></div>
                <div className="lfd-progress-label">{STATUS_LABEL[status]}</div>
              </>
            )}

            {error && <div className="lfd-error-banner">⚠ {error}</div>}
          </div>
        )}

        {/* Insights (only after analysis) */}
        {hasResult ? (
          <InsightSections analysis={analysis} documents={documents} loanId={loanId} onDecision={handleDecision} />
        ) : (
          !isRunning && (
            <div className="lfd-panel">
              <div className="lfd-empty">
                <div className="icon">🤖</div>
                <h3>Verification ready</h3>
                <p>Attach the applicant's documents and click <b>Run AI verification</b>. Results typically arrive in ~25&nbsp;seconds.</p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

// ─── INSIGHT SECTIONS ─────────────────────────────────
function InsightSections({ analysis, documents, loanId, onDecision }) {
  const docs = analysis.documentsResult || {};
  const docKeys = Object.keys(docs);

  // Index uploaded documents by their fieldKey so each insight card can pick up
  // its own thumbnail/file URL.
  const docByKey = Object.fromEntries((documents || []).map(d => [d.fieldKey, d]));

  return (
    <>
      <InsightHeader analysis={analysis} />

      <div className="lfd-panel">
        <div className="lfd-panel-head">
          <h2>Risk score breakdown</h2>
          <span className="meta">How the {analysis.riskScore} pts were accumulated</span>
        </div>
        <RiskBreakdown riskFactors={analysis.riskFactors} totalScore={analysis.riskScore} />
      </div>

      <div className="lfd-panel">
        <div className="lfd-panel-head">
          <h2>Per-document insights</h2>
          <span className="meta">{docKeys.length} document{docKeys.length === 1 ? '' : 's'} analyzed</span>
        </div>
        <div className="lfd-doc-grid">
          {docKeys.map(k => (
            <DocumentInsightCard
              key={k}
              docType={k}
              result={docs[k]}
              document={docByKey[k]}
            />
          ))}
        </div>
      </div>

      <div className="lfd-panel">
        <div className="lfd-panel-head">
          <h2>Cross-document validation</h2>
          <span className="meta">Consistency checks across {docKeys.length} documents</span>
        </div>
        <CrossCheckPanel checks={analysis.crossChecks} />
      </div>

      <div className="lfd-panel">
        <div className="lfd-panel-head">
          <h2>Processing timeline</h2>
          <span className="meta">{(analysis.processingTimeMs / 1000).toFixed(1)}s end-to-end</span>
        </div>
        <AnalysisTimeline loanId={loanId} />
      </div>

      <RawAnalysisDrawer analysis={analysis} documents={documents} />

      <div className="lfd-panel">
        <div className="lfd-panel-head">
          <h2>Officer decision</h2>
          <span className="meta">System recommends <b>{analysis.recommendation}</b></span>
        </div>
        <div className="lfd-decision">
          <button className="approve"  onClick={() => onDecision('APPROVED')}>✓ Approve</button>
          <button className="escalate" onClick={() => onDecision('ESCALATED')}>⬆ Escalate</button>
          <button className="reject"   onClick={() => onDecision('REJECTED')}>✗ Reject</button>
        </div>
      </div>
    </>
  );
}

// ─── RAW ANALYSIS DRAWER ──────────────────────────────
// Collapsible JSON viewer — gives officers full access to the underlying
// analysis payload (extracted fields, EXIF metadata, QR decode, risk factors).
function RawAnalysisDrawer({ analysis, documents }) {
  const [open, setOpen] = useState(false);

  const payload = {
    riskScore: analysis.riskScore,
    riskLevel: analysis.riskLevel,
    recommendation: analysis.recommendation,
    processingTimeMs: analysis.processingTimeMs,
    analyzedAt: analysis.analyzedAt,
    riskFactors: analysis.riskFactors,
    crossChecks: analysis.crossChecks,
    documentsResult: analysis.documentsResult,
    documents,
  };
  const json = JSON.stringify(payload, null, 2);

  const copy = () => navigator.clipboard?.writeText(json);
  const download = () => {
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement('a');
    a.href = url;
    a.download = `analysis-${analysis.id || 'export'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="lfd-panel">
      <div className="lfd-panel-head" style={{ cursor: 'pointer' }} onClick={() => setOpen(o => !o)}>
        <h2>Raw analysis payload</h2>
        <span className="meta">{open ? '▾ Hide' : '▸ Show'} full JSON for inspection</span>
      </div>
      {open && (
        <>
          <div className="lfd-raw-toolbar">
            <button onClick={copy}>📋 Copy</button>
            <button onClick={download}>⬇ Download</button>
          </div>
          <pre className="lfd-raw">{json}</pre>
        </>
      )}
    </div>
  );
}

// ─── DROPZONE ─────────────────────────────────────────
function DocumentDropzone({ docType, file, onDrop, disabled }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'], 'application/pdf': ['.pdf'] },
    maxSize: 10 * 1024 * 1024,
    multiple: false,
    disabled,
  });

  return (
    <div
      {...getRootProps()}
      className={`lfd-drop ${isDragActive ? 'drag-active' : ''} ${file ? 'has-file' : ''}`}
    >
      <input {...getInputProps()} />
      <div className="icon">{file ? '✓' : docType.icon}</div>
      <div className="label">{docType.label}</div>
      {file ? (
        <div className="file">{file.name} · {(file.size / 1024).toFixed(0)} KB</div>
      ) : (
        <div className="hint">Drop file or click</div>
      )}
    </div>
  );
}

