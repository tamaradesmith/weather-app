import React from 'react';
import {NavLink} from 'react-router-dom'

function NavBar() {
  return (

    <header>
      <NavLink to="/DashboardTemperature"> Tempature</NavLink>
      <NavLink to="/DashboardHumidily">Humidily</NavLink>
      <NavLink to="/DashboardWind"> Wind</NavLink>
      <NavLink to="/DashboardIndoors"> Indoors</NavLink>
      <NavLink to="/DashboardOutdoors"> Outdoors</NavLink>
    </header>
  )
};
export default NavBar;