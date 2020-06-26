import React from 'react';
import { NavLink } from 'react-router-dom';
import NavMenu from './NavMenu';

function NavBar(props) {
  return (

    <header className="nav-bar">
      <NavMenu admin={props.admin} />
      <NavLink to="/site" className="header-item"> Site</NavLink>
      <NavLink to="/inside" className="header-item"> Inside</NavLink>
      <NavLink to="/outside" className="header-item"> Outside</NavLink>
    </header>
  );
};
export default NavBar;