// frontend/src/component/RiskBreakdown.jsx
// Shows how each signal contributed to the final risk score.

const SOURCE_COLORS = {
  aadhaar:          '#3b82f6',
  pan:              '#8b5cf6',
  itr:              '#ec4899',
  employmentLetter: '#f59e0b',
  aadhaarQR:        '#ef4444',
  crossCheck:       '#10b981',
};

const SOURCE_LABELS = {
  aadhaar:          'Aadhaar',
  pan:              'PAN',
  itr:              'ITR',
  employmentLetter: 'Employment Letter',
  aadhaarQR:        'Aadhaar QR',
  crossCheck:       'Cross-check',
};

const CHECK_LABELS = {
  NAME_MATCH:               'Name mismatch across docs',
  INCOME_CONSISTENCY:       'Income ↔ Salary mismatch',
  PAN_FORMAT_VALID:         'PAN format invalid',
  PAN_SURNAME_RULE:         'PAN surname rule failed',
  PAN_AADHAAR_NAME_MATCH:   'PAN ↔ Aadhaar name mismatch',
  PAN_AADHAAR_DOB_MATCH:    'PAN ↔ Aadhaar DOB mismatch',
  AADHAAR_QR_PRESENT:       'Aadhaar QR missing',
  AADHAAR_QR_MATCHES_PRINT: 'QR ↔ printed text mismatch',
  EMPLOYER_GST_VALID:       'Employer GST invalid',
  EMPLOYMENT_LETTER_RECENT: 'Letter older than 3 months',
  QR_NOT_FOUND:             'QR code not detected',
  QR_OCR_MISMATCH:          'QR data ≠ printed text',
};

function describeFactor(f) {
  if (f.check) return CHECK_LABELS[f.check] || f.check;
  if (f.flags && f.flags.length > 0) {
    return `${SOURCE_LABELS[f.source] || f.source} — ${f.flags.length} flag${f.flags.length > 1 ? 's' : ''}`;
  }
  if (f.error) return `${SOURCE_LABELS[f.source] || f.source} — unreadable`;
  return SOURCE_LABELS[f.source] || f.source;
}

function getPoints(f) {
  return f.contribution ?? f.penalty ?? 0;
}

export function RiskBreakdown({ riskFactors = [], totalScore = 0 }) {
  const factors = (riskFactors || [])
    .map(f => ({ ...f, points: getPoints(f) }))
    .filter(f => f.points > 0)
    .sort((a, b) => b.points - a.points);

  if (factors.length === 0) {
    return (
      <div style={{ padding: '20px 0', textAlign: 'center', color: 'var(--c-text-3)', fontSize: 13 }}>
        ✓ No risk-contributing factors detected — all checks passed cleanly.
      </div>
    );
  }

  const total = factors.reduce((s, f) => s + f.points, 0);
  const cleanPoints = Math.max(0, 100 - totalScore);

  return (
    <div>
      <div className="lfd-rb-bar">
        {factors.map((f, i) => {
          const pct = (f.points / 100) * 100;
          const color = SOURCE_COLORS[f.source] || '#6b7280';
          return (
            <div
              key={i}
              className="lfd-rb-seg"
              style={{ width: `${pct}%`, background: color }}
              title={`${describeFactor(f)} — ${f.points} pts`}
            >
              {pct >= 6 ? f.points : ''}
            </div>
          );
        })}
        {cleanPoints > 0 && (
          <div
            className="lfd-rb-seg"
            style={{ width: `${cleanPoints}%`, background: '#e5e7eb', color: '#6b7280' }}
            title={`${cleanPoints} pts headroom`}
          >
            {cleanPoints >= 6 ? cleanPoints : ''}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--c-text-3)', marginTop: 6 }}>
        <span>0</span>
        <span style={{ fontWeight: 600 }}>Risk: {totalScore} / 100 ({total} pts from {factors.length} signal{factors.length > 1 ? 's' : ''})</span>
        <span>100</span>
      </div>

      <div className="lfd-rb-list">
        {factors.map((f, i) => (
          <div key={i} className="lfd-rb-item">
            <span className="swatch" style={{ background: SOURCE_COLORS[f.source] || '#6b7280' }} />
            <span className="lbl">{describeFactor(f)}</span>
            <span className="pts">+{f.points}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
