import React, { useState, useEffect } from 'react';

import { Display } from '../js/requests';

import Temperature from "./gauges/Temperature";
import Humidily from './gauges/Humidity';

function DashboardInside(props) {

  const [site, setSite] = useState('New Westminster');
  const [displaySensors, setDisplaySensors] = useState([]);


  async function getDisplaySensors() {
    const user = 1;
    const sensors = await Display.getDisplaySensors('inside', user)
    console.log("getDisplaySensors -> sensors", sensors);
    setDisplaySensors(sensors);
  };

  useEffect(() => {
    getDisplaySensors();
  }, []);

  return (
    <main className="DashboardInside site">
      <h1 className="site-header">{site}: Inside</h1>

      <div className="site-temperature ">
        <h3 className="site-sensor-header">Temperature</h3>
        <div id="temperatureInside" className="column-1">
          <Temperature sensorId={displaySensors.temperatureMain} />
        </div>
        <h4 className="site-label">--Main--</h4>
        <div id="temperature-outside" className="column-2">
          <Temperature sensorId={displaySensors.temperatureBedroom} />
        </div>
        <h4 className="site-label">--Bedroom--</h4>
      </div>

      <div className="inside-humidily">
        <h3 className="site-sensor-header">Humidily</h3>
        <div className="site-humidily-gauge">
          <Humidily sensorId={displaySensors.humidily} size={"200px"} />
        </div>
        <h4 className="site-label">--Inside--</h4>
      </div>
    </main>
  );
};
export default DashboardInside;