// frontend/src/components/FraudAlertBanner.jsx
import { useState, useEffect } from 'react';

export function FraudAlertBanner({ alert, onDismiss }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Animate in
    setTimeout(() => setVisible(true), 10);
    // Auto-dismiss after 8 seconds
    const timer = setTimeout(() => handleDismiss(), 8000);
    return () => clearTimeout(timer);
  }, []);

  function handleDismiss() {
    setVisible(false);
    setTimeout(onDismiss, 300);
  }

  return (
    <div style={{
      ...bannerStyle,
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(-12px)',
      transition: 'opacity .3s, transform .3s',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
        <span style={{ fontSize: 18 }}>🚨</span>
        <div>
          <div style={{ fontWeight: 600, fontSize: 13, color: '#7f1d1d' }}>
            Fraud Alert — Risk Score: {alert.riskScore}
          </div>
          <div style={{ fontSize: 12, color: '#991b1b', marginTop: 1 }}>
            {alert.message}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <a
          href={`/loans/${alert.loanId}`}
          style={{ fontSize: 12, fontWeight: 600, color: '#7f1d1d', textDecoration: 'underline' }}
        >
          Review →
        </a>
        <button onClick={handleDismiss} style={dismissBtn}>✕</button>
      </div>
    </div>
  );
}

const bannerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  background: '#fef2f2',
  border: '1px solid #fca5a5',
  borderLeft: '4px solid #E24B4A',
  borderRadius: 8,
  padding: '10px 14px',
  marginBottom: 10,
};

const dismissBtn = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  fontSize: 14,
  color: '#9ca3af',
  padding: '2px 6px',
  borderRadius: 4,
  lineHeight: 1,
};
