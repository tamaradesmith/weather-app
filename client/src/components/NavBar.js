import React from 'react';
import { NavLink } from 'react-router-dom';
import NavMenu from './NavMenu';

function NavBar() {
  return (

    <header className="nav-bar">
      <NavMenu />
      <NavLink to="/site" className="header-item"> Site</NavLink>
      <NavLink to="/inside" className="header-item"> Inside</NavLink>
      <NavLink to="/outside" className="header-item"> Outside</NavLink>
    
      {/* <NavLink to="/DashboardTemperature" className="header-item"> Temperature</NavLink> */}
      {/* <NavLink to="/DashboardHumidily" className="header-item">Humidily</NavLink> */}
      {/* <NavLink to="/DashboardWind" className="header-item"> Wind</NavLink> */}
 
    </header>
  );
};
export default NavBar;