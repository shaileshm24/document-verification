// frontend/src/components/DocumentChecklist.jsx

const DOC_LABELS = {
  aadhaar: 'Aadhaar Card',
  itr: 'ITR Filing',
  employmentLetter: 'Employment Letter',
};

const FLAG_LABELS = {
  FONT_INCONSISTENCY: 'Font inconsistency detected',
  QR_SUSPICIOUS: 'QR code appears modified',
  PHOTO_MANIPULATION: 'Photo shows editing signs',
  ALIGNMENT_ISSUES: 'Text alignment issues',
  COLOR_INCONSISTENCY: 'Color inconsistency',
  PIXELATION_AROUND_TEXT: 'Unusual text pixelation',
  METADATA_MISMATCH: 'Metadata mismatch',
  INCORRECT_PAN_FORMAT: 'Invalid PAN format',
  INCOME_SUSPICIOUSLY_ROUND: 'Suspiciously round income figure',
  MISSING_ACKNOWLEDGEMENT: 'Missing acknowledgement number',
  FONT_MISMATCH: 'Font mismatch',
  INCORRECT_ASSESSMENT_YEAR: 'Incorrect assessment year',
  COMPUTATION_ERROR: 'Computation error found',
  GENERIC_TEMPLATE: 'Matches known forged template',
  INVALID_GST_FORMAT: 'Invalid GST number format',
  NO_COMPANY_STAMP: 'Missing company stamp',
  SALARY_INCONSISTENT_WITH_DESIGNATION: 'Salary inconsistent with designation',
  MISSING_LETTERHEAD: 'Missing letterhead',
  SUSPICIOUS_FONT: 'Suspicious font usage',
  NO_HR_CONTACT: 'No HR contact details',
  ROUND_SALARY_FIGURES: 'Suspiciously round salary figures',
};

function AuthenticityBar({ score }) {
  const pct = Math.round((score || 0) * 100);
  const color = pct >= 80 ? '#639922' : pct >= 50 ? '#BA7517' : '#E24B4A';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
      <div style={{ flex: 1, height: 5, background: '#e5e7eb', borderRadius: 3 }}>
        <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 3, transition: 'width .4s' }} />
      </div>
      <span style={{ fontSize: 11, color, fontFamily: 'monospace', minWidth: 32 }}>{pct}%</span>
    </div>
  );
}

export function DocumentChecklist({ documentResults = {}, crossChecks = [] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {Object.entries(documentResults).map(([docType, result]) => {
        if (!result || result.error) {
          return (
            <div key={docType} style={cardStyle('#fee2e2', '#fca5a5')}>
              <div style={rowStyle}>
                <span style={iconStyle}>✗</span>
                <span style={{ fontWeight: 600, color: '#991b1b' }}>{DOC_LABELS[docType] || docType}</span>
                <span style={badgeStyle('#fca5a5', '#991b1b')}>Error</span>
              </div>
              <div style={{ fontSize: 11, color: '#b91c1c', marginTop: 4 }}>{result?.error || 'Analysis failed'}</div>
            </div>
          );
        }

        const { analysis, extracted } = result;
        const flags = analysis?.forgeryFlags || [];
        const score = analysis?.authenticityScore ?? 1;
        const isClean = flags.length === 0 && score >= 0.8;
        const bg = isClean ? '#f0fdf4' : flags.length > 0 ? '#fef2f2' : '#fffbeb';
        const border = isClean ? '#86efac' : flags.length > 0 ? '#fca5a5' : '#fcd34d';

        return (
          <div key={docType} style={cardStyle(bg, border)}>
            <div style={rowStyle}>
              <span style={iconStyle}>{isClean ? '✓' : flags.length > 0 ? '✗' : '!'}</span>
              <span style={{ fontWeight: 600, color: '#111827', flex: 1 }}>{DOC_LABELS[docType] || docType}</span>
              <span style={badgeStyle(border, isClean ? '#166534' : flags.length > 0 ? '#991b1b' : '#92400e')}>
                {isClean ? 'Authentic' : flags.length > 0 ? `${flags.length} flag${flags.length > 1 ? 's' : ''}` : 'Warning'}
              </span>
            </div>

            <AuthenticityBar score={score} />

            {extracted && (
              <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {extracted.name && <Chip label="Name" value={extracted.name} />}
                {extracted.annualIncome && <Chip label="Income" value={`₹${Number(extracted.annualIncome).toLocaleString('en-IN')}`} />}
                {extracted.monthlySalary && <Chip label="Salary/mo" value={`₹${Number(extracted.monthlySalary).toLocaleString('en-IN')}`} />}
                {extracted.employerName && <Chip label="Employer" value={extracted.employerName} />}
                {extracted.assessmentYear && <Chip label="AY" value={extracted.assessmentYear} />}
              </div>
            )}

            {flags.length > 0 && (
              <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 3 }}>
                {flags.map((flag, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#b91c1c' }}>
                    <span>⚠</span>
                    <span>{FLAG_LABELS[flag] || flag}</span>
                  </div>
                ))}
              </div>
            )}

            {analysis?.notes && (
              <div style={{ marginTop: 6, fontSize: 11, color: '#4b5563', fontStyle: 'italic', lineHeight: 1.5 }}>
                {analysis.notes}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function Chip({ label, value }) {
  return (
    <div style={{ fontSize: 10, background: '#f3f4f6', border: '0.5px solid #e5e7eb', borderRadius: 4, padding: '2px 7px', color: '#374151' }}>
      <span style={{ color: '#9ca3af' }}>{label}: </span>{value}
    </div>
  );
}

const cardStyle = (bg, border) => ({
  background: bg,
  border: `0.5px solid ${border}`,
  borderRadius: 10,
  padding: '10px 12px',
});

const rowStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
};

const iconStyle = {
  fontSize: 14,
  width: 20,
  textAlign: 'center',
};

const badgeStyle = (bg, color) => ({
  fontSize: 10,
  fontWeight: 600,
  background: bg,
  color,
  padding: '2px 8px',
  borderRadius: 20,
  marginLeft: 'auto',
});
