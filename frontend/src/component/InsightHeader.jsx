// frontend/src/component/InsightHeader.jsx
// Top hero block: risk gauge + recommendation + quick-glance stats.

import { RiskScoreGauge } from './RiskScoreGauge';

const RECO_META = {
  APPROVE:       { cls: 'approve', icon: '✓', text: 'APPROVE' },
  MANUAL_REVIEW: { cls: 'review',  icon: '⚠', text: 'MANUAL REVIEW' },
  REJECT:        { cls: 'reject',  icon: '✗', text: 'REJECT' },
};

function countFlags(documentsResult = {}) {
  let total = 0;
  Object.values(documentsResult).forEach(d => {
    if (!d) return;
    total += d.analysis?.forgeryFlags?.length || 0;
    total += (d.exifAnalysis?.flags || []).filter(f => f !== 'NO_EXIF_METADATA').length;
    if (d.qrVerification && (!d.qrVerification.qrFound || d.qrVerification.crossCheck?.mismatches?.length > 0)) {
      total += 1;
    }
  });
  return total;
}

export function InsightHeader({ analysis }) {
  const riskScore = analysis?.riskScore ?? 0;
  const reco = RECO_META[analysis?.recommendation] || RECO_META.APPROVE;
  const docs = analysis?.documentsResult || {};
  const docCount = Object.keys(docs).length;
  const flagCount = countFlags(docs);
  const checks = analysis?.crossChecks || [];
  const passedChecks = checks.filter(c => c.pass).length;
  const failedChecks = checks.filter(c => !c.pass).length;
  const procMs = analysis?.processingTimeMs || 0;

  return (
    <div className="lfd-hero">
      <div>
        <RiskScoreGauge score={riskScore} />
      </div>

      <div className="lfd-hero-meta">
        <span className={`lfd-reco-badge ${reco.cls}`}>
          <span style={{ fontSize: 16 }}>{reco.icon}</span> {reco.text}
        </span>

        <div className="lfd-stats">
          <div className="lfd-stat">
            <div className="k">Documents</div>
            <div className="v">{docCount}</div>
            <div className="h">analyzed</div>
          </div>
          <div className="lfd-stat">
            <div className="k">Flags</div>
            <div className={`v ${flagCount === 0 ? 'pass' : flagCount <= 2 ? 'warn' : 'fail'}`}>{flagCount}</div>
            <div className="h">forensic signals</div>
          </div>
          <div className="lfd-stat">
            <div className="k">Cross-checks</div>
            <div className={`v ${failedChecks === 0 ? 'pass' : 'fail'}`}>
              {passedChecks}<span style={{ color: 'var(--c-text-4)', fontWeight: 400 }}>/{checks.length}</span>
            </div>
            <div className="h">passed</div>
          </div>
          <div className="lfd-stat">
            <div className="k">Processing</div>
            <div className="v">{(procMs / 1000).toFixed(1)}s</div>
            <div className="h">Claude + forensics</div>
          </div>
        </div>
      </div>
    </div>
  );
}
