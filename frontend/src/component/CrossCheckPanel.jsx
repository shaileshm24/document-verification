// frontend/src/component/CrossCheckPanel.jsx
// Renders the cross-document validation checks with readable labels.

const CHECK_META = {
  NAME_MATCH:               { label: 'Name consistency',          icon: '👤', desc: 'Names across all documents match' },
  INCOME_CONSISTENCY:       { label: 'Income consistency',        icon: '💰', desc: 'Declared salary aligns with ITR' },
  PAN_FORMAT_VALID:         { label: 'PAN structure',             icon: '🔢', desc: 'PAN follows AAAAA9999A format and checksum' },
  PAN_SURNAME_RULE:         { label: 'PAN surname rule',          icon: '📝', desc: '5th letter of PAN matches surname initial' },
  PAN_AADHAAR_NAME_MATCH:   { label: 'PAN ↔ Aadhaar name',        icon: '🪪', desc: 'PAN and Aadhaar bear the same name' },
  PAN_AADHAAR_DOB_MATCH:    { label: 'PAN ↔ Aadhaar DOB',         icon: '📅', desc: 'PAN and Aadhaar bear the same DOB' },
  AADHAAR_QR_PRESENT:       { label: 'Aadhaar QR present',        icon: '🔳', desc: 'UIDAI QR code is present on the card' },
  AADHAAR_QR_MATCHES_PRINT: { label: 'QR ↔ printed text',         icon: '🔍', desc: 'QR-embedded data matches printed fields' },
  EMPLOYER_GST_VALID:       { label: 'Employer GST',              icon: '🏛',  desc: 'Employer GSTIN format is valid' },
  EMPLOYMENT_LETTER_RECENT: { label: 'Letter recency',            icon: '⏱',  desc: 'Employment letter is < 3 months old' },
};

export function CrossCheckPanel({ checks = [] }) {
  if (!checks || checks.length === 0) {
    return (
      <div style={{ padding: '20px 0', textAlign: 'center', color: 'var(--c-text-3)', fontSize: 13 }}>
        No cross-document checks ran — only a single document was uploaded.
      </div>
    );
  }

  const passed = checks.filter(c => c.pass).length;
  const failed = checks.filter(c => !c.pass).length;

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12, fontSize: 12 }}>
        <span className="lfd-pill pass">✓ {passed} passed</span>
        {failed > 0 && <span className="lfd-pill fail">✗ {failed} failed</span>}
      </div>

      <div className="lfd-cx-list">
        {checks.map((c, i) => {
          const meta = CHECK_META[c.check] || { label: c.check.replace(/_/g, ' '), icon: '•', desc: '' };
          return (
            <div key={i} className={`lfd-cx ${c.pass ? 'pass' : 'fail'}`}>
              <span className="icon">{c.pass ? '✓' : '✗'}</span>
              <div className="body">
                <div className="label">
                  {meta.icon} {meta.label}
                </div>
                <div className="detail">
                  {c.detail || meta.desc}
                  {typeof c.score === 'number' && (
                    <span style={{ marginLeft: 6, fontFamily: 'ui-monospace, Menlo, Consolas, monospace', fontSize: 11, color: 'var(--c-text-3)' }}>
                      · similarity {Math.round(c.score * 100)}%
                    </span>
                  )}
                  {typeof c.ratio === 'number' && (
                    <span style={{ marginLeft: 6, fontFamily: 'ui-monospace, Menlo, Consolas, monospace', fontSize: 11, color: 'var(--c-text-3)' }}>
                      · ratio {c.ratio}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
