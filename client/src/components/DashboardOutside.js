import React, { useState, useEffect } from 'react';

import { Display } from '../js/requests';

import Temperature from './gauges/Temperature';
import Humidily from './gauges/Humidity';
import Wind from './gauges/Wind';
import Rainfall from './gauges/Rainfall';

function DashboardOutside() {

  const [site, setSite] = useState('New Westminster');
  const [displaySensors, setDisplaySensors] = useState([]);

  async function getDisplaySensors() {
    const user = 1;
    const sensors = await Display.getDisplaySensors('outside', user)
    console.log("getDisplaySensors -> sensors", sensors);
    setDisplaySensors(sensors);
  };


  useEffect(() => {
    getDisplaySensors()
  }, []);

  return (
    <main className='DashboardOutside site'>
      <h1 className='site-header'>{site}: Outside </h1>


      <div className="site-temperature">
        <h3 className="site-sensor-header">Temperature</h3>
        <div id="temperatureInside" className="column-1">
          <Temperature sensorId={displaySensors.temperatureOutside} />
        </div>
        <h4 className="site-label">--Outside--</h4>
        <div id="temperature-outside" className="column-2">
          <Temperature sensorId={displaySensors.temperatureShade} />
        </div>
        <h4 className="site-label">--Shade--</h4>
      </div>

      <div className="site-wind" style={{ "width": "300px", "height": '300px' }}>
        <h3 className="site-sensor-header">Wind</h3>
        <div>
          <Wind sensorDirection={displaySensors.windDirection} sensorSpeed={displaySensors.windSpeed} size={'200px'} />
        </div>
      </div>

      <div className="outside-humidily">
        <h3 className="site-sensor-header">Humidily</h3>
        <div className="site-humidily-gauge">
          <Humidily sensorId={displaySensors.humidily} size={"70px"} />
        </div>
        {/* <h4 className="site-label">--Inside--</h4> */}
      </div>

      <div className="outside-sky-colour">
        <h3 className="site-sensor-header">Sky Colour</h3>
        <div className="site-humidily-gauge">
          {/* <Humidily sensorId={displaySensors.humidily} size={"70px"} /> */}
        </div>
      </div>

      <div className="outside-rain">
        <h3 className="site-sensor-header">Rain</h3>
      <Rainfall sensorId={displaySensors.rainfallSensor} />
      </div>

    </main>
  );
};
export default DashboardOutside;