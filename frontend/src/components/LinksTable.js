import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteLink } from '../api';

export default function LinksTable({ links, onDelete }) {
  const [deleting, setDeleting] = useState(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(null);

  const handleDelete = async (code) => {
    if (!window.confirm('Are you sure you want to delete this link?')) return;

    setDeleting(code);
    setError('');

    try {
      await deleteLink(code);
      onDelete(code);
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleting(null);
    }
  };

  const copyToClipboard = (code) => {
    const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000';
    const shortUrl = `${baseUrl}/${code}`;
    navigator.clipboard.writeText(shortUrl);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  const truncateUrl = (url, length = 40) => {
    return url.length > length ? url.substring(0, length) + '...' : url;
  };

  if (links.length === 0) {
    return (
      <div className="card empty-state">
        <h3>No links yet</h3>
        <p>Create your first short link to get started!</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      {error && <div className="alert alert-error">{error}</div>}
      
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Target URL</th>
            <th>Clicks</th>
            <th>Last Clicked</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {links.map((link) => (
            <tr key={link.id}>
              <td>
                <button
                  onClick={() => copyToClipboard(link.code)}
                  className="code-cell"
                  title="Click to copy short URL"
                >
                  {link.code}
                  {copied === link.code && (
                    <span style={{ fontSize: '0.75rem', color: '#16a34a', marginLeft: '0.5rem' }}>
                      ✓ Copied
                    </span>
                  )}
                </button>
              </td>
              <td className="url-cell" title={link.target_url}>
                {truncateUrl(link.target_url)}
              </td>
              <td>
                <span className="badge">{link.total_clicks}</span>
              </td>
              <td>
                {link.last_clicked
                  ? new Date(link.last_clicked).toLocaleDateString()
                  : 'Never'}
              </td>
              <td>
                <Link to={`/code/${link.code}`} style={{ marginRight: '1rem' }}>
                  View
                </Link>
                <button
                  onClick={() => handleDelete(link.code)}
                  disabled={deleting === link.code}
                  className="btn-danger"
                >
                  {deleting === link.code ? 'Deleting...' : 'Delete'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
