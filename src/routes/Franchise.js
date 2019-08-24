import React from 'react';
import '../styles/Franchise.scss';
import { Link } from 'react-router-dom';

function Franchise() {
  return (
    <div>
      <div className="rootWrapper">
        <Link to="/mcuverse" title="Marvel Cinematic Universe">
          <div className="franchiseWrapper" style={{ backgroundColor: '#19181f' }}>
            <img src='/assets/Marvel_Studios_2016_logo.svg' alt='MCU logo' />
          </div>
        </Link>
        <Link to="/starwars" title = "Star Wars">
          <div className="franchiseWrapper" style={{ backgroundColor: 'black' }}>
            <p className="franchiseName starwars">Star Wars</p>
          </div>
        </Link>
      </div>
      <div className="credit">
        <a href="https://github.com/seanlennaerts/" target="_blank" rel="noopener noreferrer">Sean Lennaerts</a>
      </div>
    </div>

  );
}

export { Franchise };