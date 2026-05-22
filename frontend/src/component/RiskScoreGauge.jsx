// frontend/src/components/RiskScoreGauge.jsx
import { useEffect, useRef } from 'react';

const COLORS = {
  low: '#639922',
  medium: '#BA7517',
  high: '#E24B4A',
};

function getRiskColor(score) {
  if (score >= 70) return COLORS.high;
  if (score >= 40) return COLORS.medium;
  return COLORS.low;
}

function getRiskLabel(score) {
  if (score >= 70) return 'HIGH RISK';
  if (score >= 40) return 'MEDIUM RISK';
  return 'LOW RISK';
}

export function RiskScoreGauge({ score = 0 }) {
  const canvasRef = useRef(null);
  const color = getRiskColor(score);
  const label = getRiskLabel(score);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const cx = canvas.width / 2;
    const cy = canvas.height - 20;
    const radius = 90;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background arc
    ctx.beginPath();
    ctx.arc(cx, cy, radius, Math.PI, 0);
    ctx.lineWidth = 18;
    ctx.strokeStyle = '#e5e7eb';
    ctx.stroke();

    // Filled arc based on score
    const angle = Math.PI + (score / 100) * Math.PI;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, Math.PI, angle);
    ctx.lineWidth = 18;
    ctx.strokeStyle = color;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Tick marks
    for (let i = 0; i <= 10; i++) {
      const tickAngle = Math.PI + (i / 10) * Math.PI;
      const x1 = cx + (radius - 12) * Math.cos(tickAngle);
      const y1 = cy + (radius - 12) * Math.sin(tickAngle);
      const x2 = cx + (radius + 12) * Math.cos(tickAngle);
      const y2 = cy + (radius + 12) * Math.sin(tickAngle);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.lineWidth = i % 5 === 0 ? 2 : 1;
      ctx.strokeStyle = '#d1d5db';
      ctx.stroke();
    }
  }, [score, color]);

  return (
    <div style={{ textAlign: 'center', padding: '8px 0' }}>
      <canvas ref={canvasRef} width={220} height={130} style={{ display: 'block', margin: '0 auto' }} />
      <div style={{ marginTop: -16 }}>
        <div style={{ fontSize: 42, fontWeight: 700, color, fontFamily: 'monospace', lineHeight: 1 }}>
          {score}
        </div>
        <div style={{ fontSize: 11, fontWeight: 600, color, letterSpacing: '0.08em', marginTop: 4 }}>
          {label}
        </div>
        <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>Risk Score (0–100)</div>
      </div>
    </div>
  );
}
