import React, { useEffect, useState } from "react";

import { Display, Sensor } from '../js/requests';

import Temperature from './gauges/Temperature';
import Humidily from './gauges/Humidity';
import WindDirection from './gauges/WindDirection';
// import WindSpeed from './gauges/WindSpeed';

function DashboardSite(props) {

  const [site, setSite] = useState('New Westminster');
  const [dashboardSensors, setDashboardSensors] = useState([]);

  const [pressure, setPresure] = useState();
  const [rainfall, setRainfall] = useState();

  async function getDashboardSensors() {
    const user = 1;
    const getSensors = await Display.getDisplaySensors('site', user);
    console.log("getDashboardSensors -> getSensors", getSensors);
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
        <div id="tempertureInside" className="column-1">
          <Temperature sensorId={dashboardSensors.tempertureInside} />
        </div>
        <h4 className="site-label">--Inside--</h4>
        <div id="temperture-outside" className="column-2">
          <Temperature sensorId={dashboardSensors.tempertureOutside} />
        </div>
        <h4 className="site-label">--Outside--</h4>



      </div>
      <div className=" site-humidily">
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

      <div className=" site-rain border">
        <h3 className="site-sensor-header">Rain</h3>
        <p> {rainfall}</p>
      </div>

      <div className=" site-pressure border">
        <h3 className="site-sensor-header">Pressure</h3>
        <p >{pressure} </p>
      </div>

      <div className=" site-wind border" style={{'width': "300px"}}>
        <h3 className="site-sensor-header">Wind</h3>
        <WindDirection sensorId={dashboardSensors.windDirection} />
        {/* <h4 className="site-label">--Speed--</h4> */}
        {/* <div>sensor Direction </div>

        <h4 className="site-label">--Direction--</h4> */}

      </div>


    </main>
  );
};

export default DashboardSite