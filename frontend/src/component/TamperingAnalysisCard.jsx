// frontend/src/component/TamperingAnalysisCard.jsx
// Displays 10-Point Tampering Detection Results with Visual Score Gauge

export function TamperingAnalysisCard({ analysis }) {
  if (!analysis) return null;

  const score = analysis.finalTamperingScore || 0;
  const decision = analysis.decision || 'UNKNOWN';
  const riskLevel = analysis.riskLevel || 'LOW';

  // Color coding based on score
  const getColor = (s) => {
    if (s < 30) return '#4caf50'; // Green - GENUINE
    if (s < 70) return '#ff9800'; // Orange - SUSPICIOUS
    return '#f44336'; // Red - FORGED
  };

  const getBgColor = (s) => {
    if (s < 30) return '#e8f5e9';
    if (s < 70) return '#fff3e0';
    return '#ffebee';
  };

  return (
    <div className="tampering-analysis-card" style={{ backgroundColor: getBgColor(score), borderLeft: `5px solid ${getColor(score)}` }}>
      <div className="card-header">
        <h3>🔍 Document Tampering Analysis</h3>
        <span className={`badge ${riskLevel.toLowerCase()}`}>{riskLevel}</span>
      </div>

      <div className="score-container">
        <div className="score-gauge">
          <svg width="120" height="120" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="50" fill="none" stroke="#e0e0e0" strokeWidth="8" />
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke={getColor(score)}
              strokeWidth="8"
              strokeDasharray={`${(score / 100) * 314} 314`}
              style={{ transition: 'stroke-dasharray 0.3s' }}
            />
            <text x="60" y="65" textAnchor="middle" fontSize="24" fontWeight="bold" fill={getColor(score)}>
              {score.toFixed(1)}
            </text>
          </svg>
        </div>

        <div className="decision-info">
          <h4 style={{ color: getColor(score), margin: 0 }}>{decision}</h4>
          <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#666' }}>
            {decision === 'GENUINE' && '✅ Document appears authentic'}
            {decision === 'SUSPICIOUS' && '⚠️ Document needs manual review'}
            {decision === 'LIKELY_FORGED' && '❌ High probability of forgery'}
          </p>
        </div>
      </div>

      <div className="detector-breakdown">
        <h4>Detector Scores:</h4>
        {analysis.detectorBreakdown && analysis.detectorBreakdown.map((detector, idx) => (
          <div key={idx} className="detector-item">
            <div className="detector-header">
              <span className="detector-name">{detector.name}</span>
              <span className="detector-score">{detector.score.toFixed(1)}/100</span>
            </div>
            <div className="score-bar">
              <div className="fill" style={{ width: `${detector.score}%`, backgroundColor: getColor(detector.score) }} />
            </div>
            {detector.signals && detector.signals.length > 0 && (
              <div className="signals">
                {detector.signals.map((signal, s) => (
                  <span key={s} className="signal-badge">⚠️ {signal}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="recommendation-box" style={{ backgroundColor: `${getColor(score)}20`, borderLeft: `3px solid ${getColor(score)}` }}>
        <strong>Recommendation:</strong> {analysis.recommendation}
      </div>

      <style>{`
        .tampering-analysis-card {
          padding: 16px;
          border-radius: 8px;
          margin: 16px 0;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .card-header h3 {
          margin: 0;
          font-size: 16px;
        }

        .badge {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: bold;
        }

        .badge.low {
          background: #4caf50;
          color: white;
        }

        .badge.medium {
          background: #ff9800;
          color: white;
        }

        .badge.critical {
          background: #f44336;
          color: white;
        }

        .score-container {
          display: flex;
          gap: 16px;
          align-items: center;
          margin-bottom: 16px;
        }

        .score-gauge {
          flex-shrink: 0;
        }

        .decision-info {
          flex: 1;
        }

        .detector-breakdown {
          margin: 16px 0;
        }

        .detector-item {
          margin-bottom: 12px;
        }

        .detector-header {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          margin-bottom: 4px;
        }

        .detector-name {
          font-weight: 500;
        }

        .detector-score {
          font-weight: bold;
        }

        .score-bar {
          height: 6px;
          background: #e0e0e0;
          border-radius: 3px;
          overflow: hidden;
        }

        .score-bar .fill {
          height: 100%;
          transition: width 0.3s;
        }

        .signals {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          margin-top: 4px;
        }

        .signal-badge {
          font-size: 10px;
          background: #fff;
          padding: 2px 6px;
          border-radius: 3px;
          border: 1px solid #ddd;
        }

        .recommendation-box {
          padding: 12px;
          border-radius: 4px;
          margin-top: 12px;
          font-size: 13px;
        }
      `}</style>
    </div>
  );
}
