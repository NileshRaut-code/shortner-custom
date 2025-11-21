import React, { useState, useEffect } from 'react';
import CreateLinkForm from '../components/CreateLinkForm';
import LinksTable from '../components/LinksTable';
import { getAllLinks } from '../api';

export default function Dashboard() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchLinks = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await getAllLinks();
      setLinks(data);
    } catch (err) {
      setError(err.message || 'Failed to load your links');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleDelete = (code) => {
    setLinks(links.filter((link) => link.code !== code));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      {/* Page Title */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Create and manage your short links</p>
      </div>

      {/* Create Link Form */}
      <div className="mb-10">
        <CreateLinkForm onSuccess={fetchLinks} />
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="bg-white p-12 rounded-xl shadow text-center">
          <div className="mx-auto mb-4 w-10 h-10 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-gray-600 text-sm">Loading your links...</p>
        </div>

      ) : (
        <LinksTable links={links} onDelete={handleDelete} />
      )}
    </div>
  );
}
