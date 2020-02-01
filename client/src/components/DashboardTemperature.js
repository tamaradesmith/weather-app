import React, { useState } from 'react';
import { Sensor } from '../js/requests';
import Temperature from './gauges/Temperature';

function DashboardTemperature() {

  const [temperatureSensors, setTemperatureSensors] = useState(null);
  
  async function getTemperatureSensors(type) {
    const sensors = await Sensor.getSensorsbyType(type);
    setTemperatureSensors(sensors);
  }

  if (temperatureSensors === null) {
    getTemperatureSensors("temperature");
    return "loading";
  }
 
  return (
    <main className="DashboardTemperature dashboard">
      {temperatureSensors.map(sensor => (
        <Temperature key={sensor.id} sensor={sensor} />
      ))}
    </main>
  )
};

export default DashboardTemperature;