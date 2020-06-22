import React, { useEffect, useState } from "react";

import { Display, Sensor } from '../js/requests';

import Temperature from './gauges/Temperature';
import Humidily from './gauges/Humidity';
import Wind from './gauges/Wind';
import Rainfall from './gauges/Rainfall'
import Pressure from './gauges/Pressure';

function DashboardSite(props) {

  const [site, setSite] = useState('New Westminster');
  const [dashboardSensors, setDashboardSensors] = useState([]);

  const [pressure, setPresure] = useState();
  const [rainfall, setRainfall] = useState();

  async function getDashboardSensors() {
    const user = 1;
    const getSensors = await Display.getDisplaySensors('site', user);
    setDashboardSensors(getSensors);
  };

  async function getPresureReading() {
    const reading = await Sensor.getLastReading(dashboardSensors.pressureSensor);
    setPresure(reading.value);
  };

  async function getRainfallReading() {
    const reading = await Sensor.getLastReading(dashboardSensors.rainfallSensor);
    setRainfall(reading.value);
  };

  useEffect(() => {
    getDashboardSensors();
    ;
  }, []);

  useEffect(() => {
    if (dashboardSensors.pressureSensor !== undefined) { getPresureReading() };
    if (dashboardSensors.rainfallSensor !== undefined) { getRainfallReading() };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dashboardSensors])

  return (
    <main className="DashboardSite site">
      <h1 className="site-header ">{site}</h1>
      <div className="site-temperature ">
        <h3 className="site-sensor-header">Temperature</h3>
        <div id="temperatureInside" className="column-1">
          <Temperature sensorId={dashboardSensors.temperatureInside} />
        </div>
        <h4 className="site-label">--Inside--</h4>
        <div id="temperature-outside" className="column-2">
          <Temperature sensorId={dashboardSensors.temperatureOutside} />
        </div>
        <h4 className="site-label">--Outside--</h4>

      </div>
      <div className="site-humidily">
        <h3 className="site-sensor-header">Humidily</h3>
        <div className="site-humidily-gauge">
          <Humidily sensorId={dashboardSensors.humidilyInside} size={"60px"} />
        </div>
        <h4 className="site-label">--Inside--</h4>
        <div className="site-humidily-gauge">
          <Humidily sensorId={dashboardSensors.humidilyOutside} size={"60px"} />
        </div>
        <h4 className="site-label">--Outside--</h4>
      </div>



      <div className="site-wind" style={{ "width": "300px", "height": '300px' }}>
        <h3 className="site-sensor-header">Wind</h3>
        <div>
          <Wind sensorDirection={dashboardSensors.windDirection} sensorSpeed={dashboardSensors.windSpeed} size={'200px'} />
        </div>
      </div>

      <div className=" site-rain">
        <h3 className="site-sensor-header site-label-header">Rain</h3>
        <Rainfall amount={rainfall} label={30} size={'70px'} />

      </div>

      <div className=" site-pressure">
        <h3 className="site-sensor-header site-label-header">Air Pressure</h3>
        <Pressure sensorId={dashboardSensors.pressureSensor} size={"100px"} />
        {/* <p >{pressure} </p> */}
      </div>


    </main>
  );
};

export default DashboardSite