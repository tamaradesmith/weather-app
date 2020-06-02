import React, { useState } from 'react';
import { Sensor } from '../js/requests';
import Temperature from './gauges/Temperature';

function DashboardTemperature() {

  const [temperatureSensors, setTemperatureSensors] = useState(null);
  
  async function getTemperatureSensors(type) {
    const site = "New Westminster";
    const sensors = await Sensor.getSensorsbyType(type, site);
    console.log("getTemperatureSensors -> sensors", sensors);
    setTemperatureSensors(sensors);
  }

  if (temperatureSensors === null) {
    getTemperatureSensors("temperature");
    return "loading";
  }
 
  return (
    <main className="DashboardTemperature ">
    <div className="dashboard-header">
    <h2 className="header">Temperatures</h2>
    <h3>Site: {temperatureSensors[0].site}</h3>
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