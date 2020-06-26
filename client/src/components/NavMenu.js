import React from "react";
import { NavLink } from 'react-router-dom'

import configIcon from "../images/configIcon.png"

function NavMenu(props) {

  function handleClick() {
    const target = document.querySelector('#menu');
    target.classList.toggle('nav-menu');
    target.classList.toggle('hidden');
  }

  return (
    <div className="nav-icon-div">
      <img className="config-icon nav-icon" src={configIcon} alt={"config"} onClick={handleClick} />
      <div id="menu" className="hidden" >

        <div className="nav-menu-inner">
          <NavLink to="/nodes" className="nav-menu-item" onClick={handleClick}>Nodes </NavLink>
          {props.admin ? (
            <NavLink to="/nodes/configure" className="nav-menu-item" onClick={handleClick}> Add Node</NavLink>
          ) : null}
          <NavLink to='/Login' className="nav-menu-item" onClick={handleClick}> Log In</NavLink>
        </div>

      </div>
    </div>
  );
};

export default NavMenu;