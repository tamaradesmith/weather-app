import React, { useState, useEffect } from 'react';
import { Sensor } from '../js/requests';
import Humidily from './gauges/Humidity';
import Rainfall from './gauges/Rainfall';
import Pressure from './gauges/Pressure'


function DashboardHumidily(props) {
  const [humiditySensors, setHumiditySensors] = useState([]);
  const [rainfallSensors, setRainfallSensors] = useState([]);
  const [pressureSensors, setPressureSensors] = useState([]);

  async function getSensorsbyType(type, state) {
    console.log("getSensorsbyType -> type", type);
    const sensors = await Sensor.getSensorsbyTypeandSite(type, "New Westminster");
    state(sensors);
  }

useEffect(()=>{
  getSensorsbyType("humidity", setHumiditySensors )
  getSensorsbyType("rainfall", setRainfallSensors);
  getSensorsbyType("pressure", setPressureSensors);
}, [])
  

  return (
    <main className="DashboardHumidily dashboard">

      {pressureSensors.map(sensor => (
        <div key={sensor.id}>
          <Pressure sensor={sensor} />
        </div>
      ))}
      {humiditySensors.map(sensor => (
     <div key={sensor.id}>
        <Humidily  sensor={sensor} />
     </div>
      ))}
      {rainfallSensors.map(sensor => (
        <div key={sensor.id}>
          <Rainfall sensor={sensor} />
        </div>
      ))}

    </main>
  );
};
export default DashboardHumidily;