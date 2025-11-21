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
      setCodeError('Code must be 6–8 alphanumeric characters');
      return false;
    }
    setCodeError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateUrl(targetUrl) || !validateCode(customCode)) return;

    setLoading(true);

    try {
      const link = await createLink(targetUrl, customCode);

      setTargetUrl('');
      setCustomCode('');
      setSuccess(`✓ Link created! Short code: ${link.code}`);

      onSuccess();

      setTimeout(() => setSuccess(''), 4000);
    } catch (err) {
      setError(err.message || 'Failed to create link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-md w-full">
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">
        Create Short Link
      </h2>
      <p className="text-gray-600 mb-6">Paste the long URL and choose a custom short code.</p>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* URL Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Long URL *
          </label>
          <input
            type="url"
            value={targetUrl}
            onChange={(e) => {
              setTargetUrl(e.target.value);
              if (e.target.value) validateUrl(e.target.value);
            }}
            onBlur={() => validateUrl(targetUrl)}
            placeholder="https://example.com/some/long/url"
            className={`w-full px-4 py-2 rounded-lg border ${
              urlError ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {urlError && (
            <p className="text-red-600 text-sm mt-1">{urlError}</p>
          )}
        </div>

        {/* Code Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Custom Code *
          </label>
          <input
            type="text"
            value={customCode}
            onChange={(e) => {
              setCustomCode(e.target.value);
              if (e.target.value) validateCode(e.target.value);
            }}
            onBlur={() => validateCode(customCode)}
            placeholder="6–8 characters (letters & numbers)"
            className={`w-full px-4 py-2 rounded-lg border ${
              codeError ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {codeError && (
            <p className="text-red-600 text-sm mt-1">{codeError}</p>
          )}

          {customCode && !codeError && (
            <p className="text-green-600 text-sm mt-1">✓ Code looks good</p>
          )}
        </div>

        {/* Alerts */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-300 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="p-3 bg-green-50 border border-green-300 text-green-700 rounded-lg text-sm">
            {success}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !!urlError || !!codeError}
          className={`w-full py-2 rounded-lg text-white font-medium transition ${
            loading || urlError || codeError
              ? 'bg-blue-300 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Creating…' : 'Create Link'}
        </button>
      </form>
    </div>
  );
}
