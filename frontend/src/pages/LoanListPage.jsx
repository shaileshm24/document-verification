// frontend/src/pages/LoanListPage.jsx
// Landing page — lists all loan applications with applicant info, status,
// risk score, and a clickable row that opens the verification dashboard.

import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '../dashboard.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
const LOAN_TYPES = ['PERSONAL', 'HOME', 'VEHICLE', 'BUSINESS', 'EDUCATION', 'GOLD'];

export default function LoanListPage({ onOpenLoan }) {
  const [loans, setLoans]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const [showAdd, setShowAdd]   = useState(false);

  const fetchLoans = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API_BASE}/loans`, { params: { limit: 50 } });
      setLoans(data.loans || []);
      setError(null);
    } catch (e) {
      setError(e.response?.data?.error || e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLoans();
    const interval = setInterval(fetchLoans, 15000); // refresh every 15s
    return () => clearInterval(interval);
  }, [fetchLoans]);

  return (
    <div className="lfd-app">
      <div className="lfd-container">
        <div className="lfd-header">
          <div>
            <h1>Loan Applications</h1>
            <div className="sub">Open a loan to upload documents and run AI fraud verification.</div>
          </div>
          <button className="lfd-btn" style={{ width: 'auto', marginTop: 0 }} onClick={() => setShowAdd(true)}>
            + Create Loan
          </button>
        </div>

        <div className="lfd-panel">
          <div className="lfd-panel-head">
            <h2>All applications</h2>
            <span className="meta">{loans.length} record{loans.length === 1 ? '' : 's'}</span>
          </div>

          {loading && <div className="lfd-empty"><p>Loading loans…</p></div>}
          {error && <div className="lfd-error-banner">⚠ {error}</div>}

          {!loading && !error && loans.length === 0 && (
            <div className="lfd-empty">
              <div className="icon">📋</div>
              <h3>No loan applications yet</h3>
              <p>Click <b>+ Create Loan</b> to get started.</p>
            </div>
          )}

          {!loading && loans.length > 0 && (
            <table className="lfd-table">
              <thead>
                <tr>
                  <th>Application #</th>
                  <th>Applicant</th>
                  <th>Type</th>
                  <th style={{ textAlign: 'right' }}>Amount</th>
                  <th>Analysis</th>
                  <th>Risk</th>
                  <th>Recommendation</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {loans.map(loan => (
                  <tr key={loan.id} onClick={() => onOpenLoan(loan.id)} className="clickable">
                    <td><code>{loan.applicationNumber?.slice(0, 14) || loan.id.slice(0, 8)}</code></td>
                    <td>
                      <div className="strong">{loan.applicantName}</div>
                      <div className="sub-cell">{loan.applicantPhone}</div>
                    </td>
                    <td>{loan.loanType}</td>
                    <td style={{ textAlign: 'right' }}>₹ {Number(loan.loanAmountRequested).toLocaleString('en-IN')}</td>
                    <td><StatusPill status={loan.analysisStatus} /></td>
                    <td>{loan.currentRiskScore != null ? <RiskPill score={loan.currentRiskScore} /> : '—'}</td>
                    <td>{loan.recommendation ? <RecPill rec={loan.recommendation} /> : '—'}</td>
                    <td className="sub-cell">{new Date(loan.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {showAdd && (
          <AddLoanModal
            onClose={() => setShowAdd(false)}
            onCreated={(loan) => { setShowAdd(false); fetchLoans(); onOpenLoan(loan.id); }}
          />
        )}
      </div>
    </div>
  );
}

function StatusPill({ status }) {
  const map = {
    NOT_STARTED: 'muted', QUEUED: 'warn', PROCESSING: 'warn',
    COMPLETED: 'pass', FAILED: 'fail',
  };
  return <span className={`lfd-pill ${map[status] || 'muted'}`}>{(status || '—').replace('_', ' ')}</span>;
}

function RiskPill({ score }) {
  const tone = score >= 70 ? 'fail' : score >= 40 ? 'warn' : 'pass';
  return <span className={`lfd-pill ${tone}`}>{score}</span>;
}

function RecPill({ rec }) {
  const tone = rec === 'APPROVE' ? 'pass' : rec === 'REJECT' ? 'fail' : 'warn';
  return <span className={`lfd-pill ${tone}`}>{rec}</span>;
}


function AddLoanModal({ onClose, onCreated }) {
  const [form, setForm] = useState({
    applicantName: '', applicantPhone: '', applicantEmail: '',
    loanAmountRequested: '', loanType: 'PERSONAL', branchCode: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const update = (k) => (e) => setForm(prev => ({ ...prev, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const payload = {
        applicantName: form.applicantName.trim(),
        applicantPhone: form.applicantPhone.trim(),
        loanAmountRequested: Number(form.loanAmountRequested),
        loanType: form.loanType,
        ...(form.applicantEmail.trim() && { applicantEmail: form.applicantEmail.trim() }),
        ...(form.branchCode.trim() && { branchCode: form.branchCode.trim() }),
      };
      const { data } = await axios.post(`${API_BASE}/loans`, payload, {
        headers: { 'x-officer-id': localStorage.getItem('officerId') || 'OFFICER-001' },
      });
      onCreated(data);
    } catch (e) {
      setError(e.response?.data?.error || e.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="lfd-modal-backdrop" onClick={onClose}>
      <div className="lfd-modal" onClick={e => e.stopPropagation()}>
        <div className="lfd-panel-head">
          <h2>Create loan application</h2>
          <button className="lfd-modal-close" onClick={onClose} aria-label="Close">×</button>
        </div>
        <form onSubmit={submit} className="lfd-form">
          <Field label="Applicant name *">
            <input required value={form.applicantName} onChange={update('applicantName')} placeholder="Rajesh Kumar" />
          </Field>
          <Field label="Phone *">
            <input required value={form.applicantPhone} onChange={update('applicantPhone')} placeholder="9876543210" />
          </Field>
          <Field label="Email">
            <input type="email" value={form.applicantEmail} onChange={update('applicantEmail')} placeholder="rajesh@example.com" />
          </Field>
          <Field label="Loan amount (₹) *">
            <input required type="number" min="1" value={form.loanAmountRequested} onChange={update('loanAmountRequested')} placeholder="500000" />
          </Field>
          <Field label="Loan type">
            <select value={form.loanType} onChange={update('loanType')}>
              {LOAN_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="Branch code">
            <input value={form.branchCode} onChange={update('branchCode')} placeholder="BR-001" />
          </Field>

          {error && <div className="lfd-error-banner">⚠ {error}</div>}

          <div className="lfd-modal-actions">
            <button type="button" className="lfd-btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="lfd-btn" style={{ width: 'auto', marginTop: 0 }} disabled={submitting}>
              {submitting ? 'Creating…' : 'Create & open'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="lfd-field">
      <span>{label}</span>
      {children}
    </label>
  );
}
