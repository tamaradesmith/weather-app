import React, { useState, useEffect } from "react";
import { Sensor } from "../../js/requests";

import humidityIcon from '../../images/humidityIcon.png'


function Humidity(props) {
  const { sensorId, size } = props;
  const [humidity, setHumidity] = useState();

  async function getHumidityReading() {
    const reading = await Sensor.getLastReading(sensorId)
    setHumidity(reading.value);
  };

  useEffect(() => {
    if (sensorId) {
      getHumidityReading();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sensorId]);

  return (
    <div id={sensorId} className="Humidily humidity-div  sensor">
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