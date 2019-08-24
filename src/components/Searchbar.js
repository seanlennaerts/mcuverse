import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import '../styles/Searchbar.scss';
function Searchbar(props) {

  const { value, onSearchChange, placeholder } = props;
  return (
    <div className="searchmenuContainer">
      <div className="menu"><Link to="/"><FontAwesomeIcon icon={faBars} /></Link></div>
      <div className="searchContainer">
        <input
          id="search"
          type="search"
          value={value}
          onChange={onSearchChange}
          placeholder={placeholder}
          autoFocus
          autoComplete="off"
        />
      </div>
    </div>

  );
}

export { Searchbar };
