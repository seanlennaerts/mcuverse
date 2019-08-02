import React from 'react';
import '../styles/Searchbar.scss';
function Searchbar(props) {

  const { value, onSearchChange, placeholder } = props;
  return (
    <div className="searchContainer">
      <input
        type="search"
        value={value}
        onChange={onSearchChange}
        placeholder={placeholder}
        autoFocus
      />
    </div>
  );
}

export { Searchbar };
