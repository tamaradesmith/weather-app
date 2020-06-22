import React, { useState } from 'react';
import Wind from './gauges/Wind';
import { Sensor } from "../js/requests"

function Dashboardwind() {

  const [windSensors, setWindSensors] = useState(null);

  async function getSensorsbyType(type) {
    const sensors = await Sensor.getSensorsbyTypeandSite(type, "New Westminster");
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

          <div className="wind-group">

            <Wind sensor={sensor} />
          </div>

        </div>
      ))}
    </main>
  );
};
export default Dashboardwind;