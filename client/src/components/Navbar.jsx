import React from 'react';

/**
 * Navbar – top navigation bar with app title and search bar
 */
function Navbar({ searchQuery, setSearchQuery }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-icon">📝</span>
        <h1 className="navbar-title">Notes</h1>
      </div>

      <div className="search-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Search notes…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button
            className="search-clear"
            onClick={() => setSearchQuery('')}
            title="Clear search"
          >
            ✕
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
