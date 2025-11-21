import React, { useState } from 'react';
import { createLink } from '../api';

export default function CreateLinkForm({ onSuccess }) {
  const [targetUrl, setTargetUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [urlError, setUrlError] = useState('');
  const [codeError, setCodeError] = useState('');

  const validateUrl = (url) => {
    if (!url.trim()) {
      setUrlError('URL is required');
      return false;
    }
    try {
      new URL(url);
      setUrlError('');
      return true;
    } catch {
      setUrlError('Please enter a valid URL (e.g., https://example.com)');
      return false;
    }
  };

  const validateCode = (code) => {
    if (!code.trim()) {
      setCodeError('Code is required');
      return false;
    }
    if (!/^[A-Za-z0-9]{6,8}$/.test(code)) {
      setCodeError('Code must be 6-8 alphanumeric characters');
      return false;
    }
    setCodeError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateUrl(targetUrl) || !validateCode(customCode)) {
      return;
    }

    setLoading(true);

    try {
      const link = await createLink(targetUrl, customCode);
      setTargetUrl('');
      setCustomCode('');
      setSuccess(`✓ Link created! Short code: ${link.code}`);
      onSuccess();
      setTimeout(() => setSuccess(''), 4000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Create Short Link</h2>
      <p>Paste your long URL and choose a custom code (6-8 characters)</p>
      
      <form onSubmit={handleSubmit} className="form-group">
        <div>
          <label className="form-label">Long URL *</label>
          <input
            type="url"
            value={targetUrl}
            onChange={(e) => {
              setTargetUrl(e.target.value);
              if (e.target.value) validateUrl(e.target.value);
            }}
            onBlur={() => validateUrl(targetUrl)}
            placeholder="https://example.com/very/long/url"
            className={urlError ? 'error' : ''}
          />
          {urlError && <p className="error-message">{urlError}</p>}
        </div>

        <div>
          <label className="form-label">Custom Code *</label>
          <input
            type="text"
            value={customCode}
            onChange={(e) => {
              setCustomCode(e.target.value);
              if (e.target.value) validateCode(e.target.value);
            }}
            onBlur={() => validateCode(customCode)}
            placeholder="e.g., mycode (6-8 characters)"
            className={codeError ? 'error' : ''}
          />
          {codeError && <p className="error-message">{codeError}</p>}
          {customCode && !codeError && (
            <p className="success-message">✓ Code looks good</p>
          )}
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <button
          type="submit"
          disabled={loading || !!urlError || !!codeError}
          className="btn-primary"
        >
          {loading ? 'Creating...' : 'Create Link'}
        </button>
      </form>
    </div>
  );
}
