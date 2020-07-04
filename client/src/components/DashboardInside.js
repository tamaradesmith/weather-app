import React, { useState, useEffect } from 'react';

import { Display } from '../js/requests';

import Temperature from "./gauges/Temperature";
import Humidily from './gauges/Humidity';
import AirQuality from './gauges/AirQuality';

function DashboardInside(props) {

  const [displaySensors, setDisplaySensors] = useState([]);
  const [loading, setLoading] = useState(true);


  async function getDisplaySensors() {
    const user = 1;
    const sensors = await Display.getDisplaySensors('inside', user)
    setDisplaySensors(sensors);
  }; 

  function addListeners() {
    const sensors = document.querySelectorAll(".sensor");
    sensors.forEach(sensor => {
      sensor.addEventListener('click', (event) => {
        const id = event.target.closest('.sensor').id;
        props.history.push(`/sensor/${id}`);
      })
    })
  }

  useEffect(() => {
    getDisplaySensors();
  }, []);

  useEffect(() => {
    addListeners();
  }, [loading === false])

  return (
    <main className="DashboardInside site">
      <h1 className="site-header">{displaySensors.site}: Inside</h1>

      <div className="site-temperature">
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
          <Humidily sensorId={displaySensors.humidily} size={"150px"} />
        </div>
        <h4 className="site-label">--Inside--</h4>
      </div>


      <div className="inside-air-quality">
        <h3 className="site-sensor-header">Air Quality</h3>

        <AirQuality sensorId={displaySensors.co} />
        <h4 className="site-label">--CO--</h4>
        <AirQuality sensorId={displaySensors.particule} />
        <h4 className="site-label">--Particule--</h4>
      </div>

    </main>
  );
};
export default DashboardInside;