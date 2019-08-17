import React from 'react';
import {NavLink} from "react-router-dom";
import '../styles/Searchbar.scss';

function Searchbar(props) {
  return(
    <div className="searchContainer">
      <input
        type="search"
        value={props.value}
        onChange={props.onSearchChange}
        placeholder={props.placeholder}
        autoFocus
      />
      <div className="languageLinks">
        <NavLink exact to="/" onClick={() => props.onLocaleChange("en")}>
            <img src="https://www.countryflags.io/gb/flat/32.png" alt="English"/>
        </NavLink>
        <NavLink to="/pl" onClick={() => props.onLocaleChange("pl")}>
            <img src="https://www.countryflags.io/pl/flat/32.png" alt="Polish"/>
        </NavLink>
      </div>
    </div>
    );
}

export { Searchbar };
