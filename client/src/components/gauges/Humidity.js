import React, { useState, useEffect } from "react";
import { Sensor } from "../../js/requests";

import humidityIcon from '../../images/humidityIcon.png'


function Humidity(props) {
  const { sensorId, size } = props;
  console.log("Humidity -> sensorId", sensorId);
  const [humidity, setHumidity] = useState();

  async function getHumidityReading() {
    const reading = await Sensor.getLastReading(sensorId)
    console.log("getHumidityReading -> reading", reading);
    setHumidity(reading.value);
  };

  useEffect(() => {
    if (sensorId) {
      console.log('hi')

      getHumidityReading();
    };
  }, [sensorId]);

  return (
    <div className="Humidily humidity-div">
      <p className="humidity-text"> {humidity}%</p>
      <div id="humidity" className="humidity-gauge" style={{
        'backgroundImage': `linear-gradient(transparent 0%, transparent ${100 - (humidity)}%, #2C7CB0 ${100 - (humidity)}% ,#2C7CB0 100%)`, 'width': size, 'height': size
      }}>
        <img src={humidityIcon} alt={"logo"} className='humidity-img' style={{ 'width': size, 'height': size }} />
      </div>

    </div>
  )
}

export default Humidity