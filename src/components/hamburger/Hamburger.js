import React from 'react';
import './Hamburger.css';

function Hamburger() {
  return (
    <div className="hamburger">
      <a href="">
        <div className="full-square">
          <div className="top-left square"></div>
          <div className="top-right square"></div>
          <div className="bottom-left square"></div>
          <div className="bottom-right square"></div>
        </div>
      </a>
    </div>
  )
}

export default Hamburger;
