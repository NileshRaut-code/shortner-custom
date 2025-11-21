import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
            T
          </div>
          <span className="text-xl font-bold text-gray-900">TinyLink</span>
        </Link>
        <nav className="flex gap-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition">
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
}
