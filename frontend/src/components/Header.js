import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  const linkClass = (path) =>
    `px-2 py-1 text-sm font-medium transition ${
      location.pathname === path
        ? 'text-blue-600 font-semibold'
        : 'text-gray-700 hover:text-blue-600'
    }`;

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-semibold text-lg shadow-sm">
            T
          </div>
          <span className="text-2xl font-semibold text-gray-900 tracking-tight">
            TinyLink
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          <Link to="/" className={linkClass('/')}>
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
}
