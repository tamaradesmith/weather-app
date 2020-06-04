import React, { useState, useEffect } from 'react';
import { Sensor } from '../js/requests';
import Temperature from './gauges/Temperature';

function DashboardTemperature() {

  const [temperatureSensors, setTemperatureSensors] = useState([]);

  async function getTemperatureSensors(type) {
    const site = "New Westminster";
    const sensors = await Sensor.getSensorsbyType(type, site);
    console.log("getTemperatureSensors -> sensors", sensors);
    setTemperatureSensors(sensors);
  }

  useEffect(() => {
    getTemperatureSensors("temperature");
  }, [])


  return (
    <main className="DashboardTemperature ">
      <div className="dashboard-header">
        <h2 className="header">Temperatures</h2>
        <h3>Site: {(temperatureSensors.length !== 0)? (temperatureSensors[0].site):("loading")}</h3>
      </div>
      <div className="dashboard">
        {temperatureSensors.map(sensor => (
          <Temperature key={sensor.id} sensor={sensor} />
        ))}
      </div>
    </main>
  )
};

export default DashboardTemperature;