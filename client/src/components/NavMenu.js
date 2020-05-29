import React from "react";
import { NavLink } from 'react-router-dom'

import configIcon from "../images/configIcon.png"



function NavMenu(props) {
  function handleClick() {

    const target = document.querySelector('#menu');
    console.log("clcik")
    target.classList.toggle('nav-menu');
    target.classList.toggle('hidden');

  }

  return (
    <div>
      <img className="config-icon" src={configIcon} alt={"config"} onClick={handleClick} />
      <div id="menu" className="hidden">

        <div className="nav-menu-inner">
          <NavLink to="/nodes" onClick={handleClick}>Nodes </NavLink>
          <NavLink to="/nodes/configure" onClick={handleClick}> Add Node</NavLink>
        </div>
      </div>
    </div>
  );
};

export default NavMenu;