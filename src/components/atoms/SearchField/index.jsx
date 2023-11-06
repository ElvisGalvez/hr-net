import React from 'react';
import './SearchField.css';

const SearchField = ({ value, onChange, placeholder }) => {
  return (
    <div className="search-field">
      <input
        type="text"
        className="search-input"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchField;
