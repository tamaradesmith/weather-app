import React, { useState } from 'react';
import WindDirection from "./gauges/WindDirection";
import WindSpeed from './gauges/WindSpeed'
import WindSpeedLinear from './gauges/WindSpeedLinear'
import { Sensor } from "../js/requests"

function Dashboardwind() {

  const [windSensors, setWindSensors] = useState(null);

  async function getSensorsbyType(type) {
    const sensors = await Sensor.getSensorsbyType(type);
    setWindSensors(sensors);
  }

  if (windSensors === null) {
    getSensorsbyType("wind");
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
                <WindSpeedLinear sensor={sensor} />
              </div>
            )}
        </div>
      ))}
    </main>
  );
};
export default Dashboardwind;