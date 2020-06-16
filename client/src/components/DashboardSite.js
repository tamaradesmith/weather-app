import React, { useEffect, useState } from "react";

import { Display } from '../js/requests';

import Temperature from './gauges/Temperature'

function DashboardSite(props) {

  const [site, setSite] = useState('New Westminster');
  const [dashboardSensors, setDashboardSensors] = useState([]);

  // sensors
// const [temperatureInside, setTemperatureInside] = useState('');

  async function getDashboardSensors() {
    const user = 1
    const getSensors = await Display.getDisplaySensors('site', user);
    setDashboardSensors(getSensors);
  };

 function populatePage(){
    dashboardSensors.forEach(sensor =>{
  const doc = document.querySelector(`#${sensor.html_id}`)
  console.log("populatePage -> doc", doc);
    })
  }

  useEffect(() => {
    getDashboardSensors();
  }, []);

  useEffect(()=>{
    populatePage()
  })

  return (
    <main className="DashboardSite site">
      <h1 className="site-header ">{site}</h1>
      <div className="site-temperature border">
        <h3 className="site-sensor-header">Temperature</h3>
        <div id="temperture-inside" className="column-1">
          <Temperature  sensor={temperature-inside} />

          sensor Inside </div>
        <h4 className="site-label">--Inside--</h4>
        <div id="temperture-outside" className="column-2">sensor outside </div>
        <h4 className="site-label">--Outside--</h4>



      </div>
      <div className=" site-humidily border">
        <h3 className="site-sensor-header">Humidily</h3>
        <div>sensor humidily </div>

        <h4 className="site-label">--Inside--</h4>
        <div>sensor humidily </div>
        <h4 className="site-label">--Outside--</h4>

      </div>

      <div className=" site-rain border">
        <h3 className="site-sensor-header">Rain</h3>

        <div>sensor rainfall </div>

      </div>

      <div className=" site-pressure border">
        <h3 className="site-sensor-header">Pressure</h3>
        <div>sensor presure </div>
      </div>

      <div className=" site-wind border">
        <h3 className="site-sensor-header">Wind</h3>
        <div>sensor wind </div>

        <h4 className="site-label">--Speed--</h4>
        <div>sensor Direction </div>

        <h4 className="site-label">--Direction--</h4>

      </div>


    </main>
  );
};

export default DashboardSite