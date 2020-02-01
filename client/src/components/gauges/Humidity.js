import React, { useState, useEffect } from "react";
import { Sensor } from "../../js/requests";

function Humidity(props) {
  const { sensor } = props;
  const [humidityLevel, setHumidityLevel] = useState(null);
 
  async function getHumidityReading() {
    const humidity = await Sensor.getLastReading(sensor.id)
    setHumidityLevel(humidity.value);
  }

  if (humidityLevel === null) {
    getHumidityReading()
  };

  return (
    <div className="Humidily wind-div">
      <h4 className="gauge-header">{sensor.name}</h4>
      <div id="humidity" className="humidity-div" style={{
        'backgroundImage': `linear-gradient(transparent 0%, transparent ${100 - (humidityLevel)}%, blue ${100 - (humidityLevel - 5)}% ,blue 100%)`
      }}>
        <p className="humidity-text"
        >{humidityLevel}%</p>
      </div>

    </div>
  )
}

export default Humidity