// frontend/src/hooks/useLoanAnalysis.js
// Real-time loan analysis hook — connects to Socket.io for live updates

import { useState, useEffect, useCallback, useRef } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
const WS_URL = import.meta.env.VITE_WS_URL || 'http://localhost:3001';

export function useLoanAnalysis(loanId) {
  const [status, setStatus] = useState('idle'); // idle | uploading | queued | processing | completed | error
  const [progress, setProgress] = useState(0);
  const [analysis, setAnalysis] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);
  const socketRef = useRef(null);

  // Connect to WebSocket and subscribe to loan updates
  useEffect(() => {
    if (!loanId) return;

    const socket = io(WS_URL, { transports: ['websocket', 'polling'] });
    socketRef.current = socket;

    socket.on('connect', () => {
      socket.emit('subscribe:loan', loanId);
      console.log(`Subscribed to loan ${loanId} updates`);
    });

    socket.on('analysis:status', ({ status: s, message, progress: p }) => {
      setStatus(s.toLowerCase());
      if (p) setProgress(p);
    });

    socket.on('analysis:progress', ({ progress: p }) => {
      setProgress(p);
    });

    socket.on('analysis:complete', async (result) => {
      setStatus('completed');
      setProgress(100);
      // The socket payload is a summary; re-fetch the full analysis row so the UI
      // gets documentsResult, crossChecks, riskFactors and document file URLs.
      try {
        const { data } = await axios.get(`${API_BASE}/loans/${loanId}/documents/analysis`);
        setAnalysis(data.analysis || result);
        setDocuments(data.documents || []);
      } catch {
        setAnalysis(result);
      }
    });

    socket.on('analysis:error', ({ error: e }) => {
      setStatus('error');
      setError(e);
    });

    return () => socket.disconnect();
  }, [loanId]);

  // Upload documents and trigger analysis
  const uploadDocuments = useCallback(async (files) => {
    setStatus('uploading');
    setError(null);
    setProgress(5);

    try {
      const formData = new FormData();
      Object.entries(files).forEach(([type, file]) => {
        formData.append(type, file);
      });

      const response = await axios.post(
        `${API_BASE}/loans/${loanId}/documents`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'x-officer-id': localStorage.getItem('officerId') || 'OFFICER-001'
          },
          onUploadProgress: (e) => {
            const pct = Math.round((e.loaded / e.total) * 20); // Upload = first 20%
            setProgress(pct);
          }
        }
      );

      setStatus('queued');
      setProgress(20);

      return response.data;
    } catch (err) {
      setStatus('error');
      setError(err.response?.data?.error || err.message);
      throw err;
    }
  }, [loanId]);

  // Fetch existing analysis (for page refresh)
  const fetchAnalysis = useCallback(async () => {
    if (!loanId) return;
    try {
      const { data } = await axios.get(`${API_BASE}/loans/${loanId}/documents/analysis`);
      setDocuments(data.documents || []);
      if (data.status === 'COMPLETED') {
        setStatus('completed');
        setProgress(100);
        setAnalysis(data.analysis);
      } else if (data.status === 'PROCESSING') {
        setStatus('processing');
      }
    } catch (err) {
      console.error('Failed to fetch analysis:', err);
    }
  }, [loanId]);

  useEffect(() => {
    fetchAnalysis();
  }, [fetchAnalysis]);

  const reset = useCallback(() => {
    setStatus('idle');
    setProgress(0);
    setAnalysis(null);
    setDocuments([]);
    setError(null);
  }, []);

  return { status, progress, analysis, documents, error, uploadDocuments, reset };
}

// ─── DASHBOARD STATS HOOK ────────────────────────────
export function useDashboardStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/stats/dashboard`);
        setStats(data);
      } catch (err) {
        console.error('Failed to fetch dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  return { stats, loading };
}

// ─── FRAUD ALERTS HOOK ───────────────────────────────
export function useFraudAlerts() {
  const [alerts, setAlerts] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = io(WS_URL);
    socketRef.current = socket;

    socket.on('fraud:alert', (alert) => {
      setAlerts(prev => [{ ...alert, id: Date.now() }, ...prev].slice(0, 20));
    });

    return () => socket.disconnect();
  }, []);

  const dismissAlert = useCallback((id) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  }, []);

  return { alerts, dismissAlert };
}
