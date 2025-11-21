import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLinkStats } from '../api';

export default function StatsPage() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [link, setLink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError('');

      try {
        const data = await getLinkStats(code);
        setLink(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [code]);

  return (
    <main>
      <div className="max-w-2xl">
        <button
          onClick={() => navigate('/')}
          className="back-link"
        >
          ← Back to Dashboard
        </button>

        {loading ? (
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '1rem' }}>
              <div className="spinner"></div>
            </div>
            <p style={{ color: '#4b5563' }}>Loading link statistics...</p>
          </div>
        ) : error ? (
          <div className="card">
            <div className="alert alert-error" style={{ marginBottom: '1rem' }}>
              {error}
            </div>
            <button
              onClick={() => navigate('/')}
              className="btn-primary"
            >
              Back to Dashboard
            </button>
          </div>
        ) : (
          <div className="card">
            <h1 style={{ fontSize: '1.875rem', marginBottom: '0.5rem' }}>
              Link Statistics
            </h1>
            <p style={{ color: '#4b5563', marginBottom: '2rem' }}>
              Details for short code: <span style={{ fontFamily: 'monospace', fontWeight: 'bold', color: '#2563eb' }}>
                {link.code}
              </span>
            </p>

            <div className="stats-grid">
              <div>
                <label className="form-label">Short Code</label>
                <div style={{
                  backgroundColor: '#f3f4f6',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  fontFamily: 'monospace',
                  fontSize: '1.125rem',
                  color: '#2563eb',
                  border: '1px solid #e5e7eb'
                }}>
                  {link.code}
                </div>
              </div>

              <div>
                <label className="form-label">Target URL</label>
                <a
                  href={link.target_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block',
                    backgroundColor: '#f3f4f6',
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    wordBreak: 'break-all',
                    border: '1px solid #e5e7eb'
                  }}
                >
                  {link.target_url}
                </a>
              </div>

              <div className="stat-box primary">
                <label className="form-label">Total Clicks</label>
                <div className="value">{link.total_clicks}</div>
              </div>

              <div className="stat-box">
                <label className="form-label">Last Clicked</label>
                <div style={{ fontSize: '1.125rem', color: '#374151' }}>
                  {link.last_clicked
                    ? new Date(link.last_clicked).toLocaleString()
                    : 'Never clicked'}
                </div>
              </div>

              <div>
                <label className="form-label">Created</label>
                <div style={{
                  backgroundColor: '#f3f4f6',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  color: '#374151',
                  border: '1px solid #e5e7eb'
                }}>
                  {new Date(link.created_at).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
