import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="white" role="navigation">
      <div id="nav" className="nav-wrapper container">
        <img id="logo" src="../../logo.png" alt="Рибна Лавка" />
        <ul className="right hide-on-med-and-down">
          <li>
            <a href="/">Main</a>
          </li>
        </ul>
        <ul id="nav-mobile" className="side-nav">
          <li>
            <a href="/">ГОЛОВНА</a>
          </li>
        </ul>
        <a href="/" data-activates="nav-mobile" className="button-collapse">
          <i id="menu-icon" className="material-icons">
            menu
          </i>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
