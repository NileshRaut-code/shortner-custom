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
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleDelete = (code) => {
    setLinks(links.filter(link => link.code !== code));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Create and manage your short links</p>
      </div>

      <CreateLinkForm onSuccess={fetchLinks} />

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600">Loading your links...</p>
        </div>
      ) : (
        <LinksTable links={links} onDelete={handleDelete} />
      )}
    </div>
  );
}
