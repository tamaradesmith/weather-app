import React, { useState } from 'react';
import { Sensor } from '../js/requests';
import Temperature from './Temperature';
import Wind from './Wind';

function DashboardTemperature() {

  const [temperatureSensors, setTemperatureSensors] = useState(null);
  
  async function getTemperatureSensors() {
    const sensors = await Sensor.getTemperatureSensors();
    console.log("TCL: getTemperatureSensors -> sensors", sensors)
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

      {/* <Wind /> */}

      {temperatureSensors.map(sensor => (
        <Temperature key={sensor.id} sensorId={sensor.id} name={sensor.name} />
      ))}

    </main>
  )
};


export default DashboardTemperature;