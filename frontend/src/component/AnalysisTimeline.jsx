// frontend/src/components/AnalysisTimeline.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const TIMELINE_STEPS = [
  { key: 'uploaded',    label: 'Documents uploaded',              icon: '⬆' },
  { key: 'queued',      label: 'Queued for AI analysis',          icon: '⏳' },
  { key: 'processing',  label: 'Claude Vision API analyzing',     icon: '🤖' },
  { key: 'validated',   label: 'Cross-document validation',       icon: '🔍' },
  { key: 'scored',      label: 'Risk score computed',             icon: '📊' },
  { key: 'completed',   label: 'Analysis complete',               icon: '✓'  },
];

function getCompletedSteps(loan) {
  const status = loan?.analysisStatus;
  if (!status) return 0;
  if (status === 'NOT_STARTED') return 0;
  if (status === 'QUEUED')      return 2;
  if (status === 'PROCESSING')  return 3;
  if (status === 'COMPLETED')   return 6;
  if (status === 'FAILED')      return 2;
  return 0;
}

export function AnalysisTimeline({ loanId }) {
  const [loan, setLoan] = useState(null);

  useEffect(() => {
    if (!loanId) return;
    axios.get(`${API_BASE}/loans/${loanId}`)
      .then(r => setLoan(r.data))
      .catch(console.error);
  }, [loanId]);

  const completedSteps = getCompletedSteps(loan);
  const failed = loan?.analysisStatus === 'FAILED';

  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.07em', color: '#6b7280', textTransform: 'uppercase', marginBottom: 10 }}>
        Processing Timeline
      </div>
      <div style={{ position: 'relative', paddingLeft: 24 }}>
        {/* Vertical line */}
        <div style={{
          position: 'absolute', left: 7, top: 8, bottom: 8,
          width: 1, background: '#e5e7eb'
        }} />

        {TIMELINE_STEPS.map((step, i) => {
          const done = i < completedSteps;
          const active = i === completedSteps && !failed;
          const isFailed = failed && i === completedSteps;

          return (
            <div key={step.key} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 10, position: 'relative' }}>
              {/* Dot */}
              <div style={{
                width: 14, height: 14, borderRadius: '50%', flexShrink: 0, marginTop: 1,
                background: done ? '#639922' : isFailed ? '#E24B4A' : active ? '#BA7517' : '#e5e7eb',
                border: `2px solid ${done ? '#639922' : isFailed ? '#E24B4A' : active ? '#BA7517' : '#d1d5db'}`,
                position: 'relative', zIndex: 1,
                boxShadow: active ? '0 0 0 3px #fef3c7' : 'none',
              }} />
              <div style={{ flex: 1, paddingBottom: 2 }}>
                <div style={{
                  fontSize: 12,
                  fontWeight: done ? 500 : 400,
                  color: done ? '#111827' : isFailed ? '#b91c1c' : active ? '#92400e' : '#9ca3af',
                }}>
                  {step.icon} {step.label}
                </div>
                {done && i === 0 && loan?.documentsUploadedAt && (
                  <div style={timeStyle}>{formatTime(loan.documentsUploadedAt)}</div>
                )}
                {done && i === 5 && loan?.analysisCompletedAt && (
                  <div style={timeStyle}>
                    {formatTime(loan.analysisCompletedAt)}
                    {loan?.analysis?.[0]?.processingTimeMs && (
                      <span> · {(loan.analysis[0].processingTimeMs / 1000).toFixed(1)}s total</span>
                    )}
                  </div>
                )}
                {isFailed && (
                  <div style={{ fontSize: 11, color: '#b91c1c', marginTop: 2 }}>
                    {loan?.analysisError || 'Analysis failed — please retry'}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const timeStyle = {
  fontSize: 10,
  color: '#9ca3af',
  fontFamily: 'monospace',
  marginTop: 1,
};

function formatTime(isoString) {
  if (!isoString) return '';
  return new Date(isoString).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}
