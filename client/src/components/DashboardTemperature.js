import React, { useState } from 'react';
import { Sensor } from '../js/requests';
import Temperature from './gauges/Temperature';

function DashboardTemperature() {

  const [temperatureSensors, setTemperatureSensors] = useState(null);
  
  async function getTemperatureSensors() {
    const sensors = await Sensor.getTemperatureSensors();
    setTemperatureSensors(sensors);
  }

  if (temperatureSensors === null) {
    getTemperatureSensors();
    return "loading";
  }
 
  return (
    <main className="DashboardTemperature dashboard">
      {temperatureSensors.map(sensor => (
        <Temperature key={sensor.id} sensorId={sensor.id} name={sensor.name} />
      ))}
    </main>
  )
};

export default DashboardTemperature;