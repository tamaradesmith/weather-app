import React, { useState } from 'react';
import WindDirection from "./gauges/WindDirection";
import WindSpeed from './gauges/WindSpeed'
import WindSpeed2 from './gauges/WindSpeed2'
import { Sensor } from "../js/requests"

function Dashboardwind() {

  const [windSensors, setWindSensors] = useState(null);

  async function getWindSensors() {
    const sensors = await Sensor.getWindSensors();
    setWindSensors(sensors);
  }

  if (windSensors === null) {
    getWindSensors();
    return "Loading";
  };

  return (
    <main className="DashboardWind dashboard">
      {windSensors.map(sensor => (
        <div key={sensor.id}>
          {sensor.name === "wind direction" ? (
            <WindDirection sensor={sensor} />
          ) : (
            <div className="wind-group">
      <WindSpeed sensor={sensor} />
      <WindSpeed2 sensor={sensor} />
            </div>
            )}
        </div>
      ))}
    </main>
  );
};
export default Dashboardwind;