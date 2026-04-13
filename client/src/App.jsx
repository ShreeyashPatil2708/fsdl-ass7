import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="app">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Dashboard searchQuery={searchQuery} />
    </div>
  );
}

export default App;
