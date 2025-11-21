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
        setError(err.message || 'Failed to load statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [code]);

  return (
    <main className="px-4 py-10 flex justify-center">
      <div className="w-full max-w-2xl">

        <button
          onClick={() => navigate('/')}
          className="text-blue-600 hover:underline mb-6 inline-flex items-center"
        >
          ← Back to Dashboard
        </button>

        {/* Loading Spinner */}
        {loading && (
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Loading link statistics...</p>
          </div>
        )}

        {/* Error UI */}
        {error && !loading && (
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="p-4 bg-red-100 text-red-700 rounded-lg mb-4">
              {error}
            </div>
            <button
              onClick={() => navigate('/')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Back to Dashboard
            </button>
          </div>
        )}

        {/* Stats UI */}
        {!loading && !error && link && (
          <div className="bg-white p-8 rounded-xl shadow space-y-8">
            <div>
              <h1 className="text-3xl font-semibold mb-1">Link Statistics</h1>
              <p className="text-gray-600">
                For short code:{" "}
                <span className="font-mono font-bold text-blue-600">{link.code}</span>
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              {/* Short Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Short Code
                </label>
                <div className="bg-gray-100 p-3 rounded-lg font-mono text-blue-700 border">
                  {link.code}
                </div>
              </div>

              {/* Target URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Target URL
                </label>
                <a
                  href={link.target_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-gray-100 p-3 rounded-lg break-words border hover:bg-gray-200"
                >
                  {link.target_url}
                </a>
              </div>

              {/* Total Clicks */}
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <label className="block text-sm text-gray-700">Total Clicks</label>
                <div className="text-3xl font-semibold text-blue-700">
                  {link.total_clicks}
                </div>
              </div>

              {/* Last Clicked */}
              <div className="bg-gray-50 border p-4 rounded-lg">
                <label className="block text-sm text-gray-700">Last Clicked</label>
                <div className="text-lg text-gray-800">
                  {link.last_clicked
                    ? new Date(link.last_clicked).toLocaleString()
                    : 'Never clicked'}
                </div>
              </div>

              {/* Created Date */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Created At
                </label>
                <div className="bg-gray-100 p-3 rounded-lg border text-gray-800">
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
