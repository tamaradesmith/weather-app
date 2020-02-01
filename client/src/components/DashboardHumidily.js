import React, { useState } from 'react';
import { Sensor } from '../js/requests';
import Humidily from './gauges/Humidity';
import Rainfall from './gauges/Rainfall';
import Pressure from './gauges/Pressure'


function DashboardHumidily(props) {
  const [humiditySensors, setHumiditySensors] = useState(null);
  const [rainfallSensors, setRainfallSensors] = useState(null);
  const [pressureSensors, setPressureSensors] = useState(null);

  async function getSensorsbyType(type, state) {
    const sensors = await Sensor.getSensorsbyType(type);
    state(sensors);
  }

  if (humiditySensors === null ) {
    getSensorsbyType("humidity", setHumiditySensors);
    return "Loading";
  }

  if (rainfallSensors === null ) {
    getSensorsbyType("rainfall", setRainfallSensors);
    return "Loading";
  }
  if ( pressureSensors === null) {
    getSensorsbyType("pressure", setPressureSensors);
    return "Loading";
  }
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