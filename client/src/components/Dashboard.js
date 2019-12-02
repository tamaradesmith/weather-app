import React, { useState } from 'react';
import { Sensor } from '../js/requests';
import Temperature from './Temperature';
import Wind from './Wind';

function Dashboard() {

  const [temperatureSensors, setTemperatureSensors] = useState(null);
  async function getTemperatureSensors() {
    const sensors = await Sensor.getTemperatureSensors();
    setTemperatureSensors(sensors)
  }
  if (temperatureSensors === null) {
    getTemperatureSensors();
  }
  if (temperatureSensors === null){
    return "loading"
  }
  return (
    <main className="Dashboard">

      {/* <h1>Dashboard</h1> */}
      <Wind />
      {temperatureSensors.map(sensor => (

        <Temperature key={sensor.id} sensorId={sensor.id} location={sensor.location} />
      ))}
    </main>
  )
};


export default Dashboard;