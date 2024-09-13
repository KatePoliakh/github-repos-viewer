import React, { useState } from 'react';
import './Header.module.css';

function Header({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    // Trigger search if the query is not empty
    onSearch(value);
  };

  return (
    <header>
      <h1>GitHub Repo Viewer</h1>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for repositories"
      />
      </header>
  );
}

export default Header;
