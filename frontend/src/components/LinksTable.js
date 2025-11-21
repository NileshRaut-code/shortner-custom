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
    const baseUrl = process.env.REACT_APP_API_URL || window.location.origin;
    const shortUrl = `${baseUrl}/${code}`;
    navigator.clipboard.writeText(shortUrl);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  const truncateUrl = (url, length = 40) =>
    url.length > length ? url.substring(0, length) + '…' : url;

  if (links.length === 0) {
    return (
      <div className="bg-white p-10 rounded-xl shadow text-center text-gray-600">
        <h3 className="text-xl font-semibold text-gray-800">No links yet</h3>
        <p className="mt-2">Create your first short link to get started!</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow mt-8 p-4">

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 border border-red-300 rounded-lg text-sm">
          {error}
        </div>
      )}

      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b text-gray-700">
            <th className="py-3 px-4 text-sm font-semibold">Code</th>
            <th className="py-3 px-4 text-sm font-semibold">Target URL</th>
            <th className="py-3 px-4 text-sm font-semibold">Clicks</th>
            <th className="py-3 px-4 text-sm font-semibold">Last Clicked</th>
            <th className="py-3 px-4 text-sm font-semibold w-32">Actions</th>
          </tr>
        </thead>

        <tbody>
          {links.map((link) => (
            <tr
              key={link.id}
              className="border-b hover:bg-gray-50 transition"
            >
              {/* Code */}
              <td className="py-3 px-4">
                <button
                  onClick={() => copyToClipboard(link.code)}
                  className="text-blue-600 font-semibold hover:underline flex items-center gap-2"
                  title="Click to copy short URL"
                >
                  {link.code}
                  {copied === link.code && (
                    <span className="text-green-600 text-xs">✓ Copied</span>
                  )}
                </button>
              </td>

              {/* URL */}
              <td
                className="py-3 px-4 text-gray-700 max-w-xs truncate"
                title={link.target_url}
              >
                {truncateUrl(link.target_url)}
              </td>

              {/* Clicks */}
              <td className="py-3 px-4">
                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm">
                  {link.total_clicks}
                </span>
              </td>

              {/* Last Click */}
              <td className="py-3 px-4 text-gray-600">
                {link.last_clicked
                  ? new Date(link.last_clicked).toLocaleDateString()
                  : 'Never'}
              </td>

              {/* Actions */}
              <td className="py-3 px-4 flex items-center gap-4">

                <Link
                  to={`/code/${link.code}`}
                  className="text-blue-600 hover:underline text-sm"
                >
                  View
                </Link>

                <button
                  onClick={() => handleDelete(link.code)}
                  disabled={deleting === link.code}
                  className={`text-sm px-3 py-1 rounded-md border transition ${
                    deleting === link.code
                      ? 'bg-red-200 border-red-300 text-red-600 cursor-not-allowed'
                      : 'bg-red-50 border-red-300 text-red-700 hover:bg-red-100'
                  }`}
                >
                  {deleting === link.code ? 'Deleting…' : 'Delete'}
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
