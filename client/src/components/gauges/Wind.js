import React, { useState, useEffect } from 'react';
import { Sensor } from '../../js/requests'

import compass from '../../images/compass3.png';

function Wind(props) {

  const { sensorDirection, sensorSpeed, size } = props;

  const [windDirection, setWindDirection] = useState(0);
  const [windSpeed, setWindSpeed] = useState();

  async function getWindReading() {
    const windDirectionReading = await Sensor.getLastReading(sensorDirection);
    const windSpeedReading = await Sensor.getLastReading(sensorSpeed);
    setWindDirection(windDirectionReading.value);
    setWindSpeed(windSpeedReading);
  };

  useEffect(() => {
    if (sensorSpeed && sensorDirection) { getWindReading(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sensorSpeed]);

  return (
    <div className="WindDirection wind-div" style={{ 'width': size, 'height': size }} >
      <div className="wind-arrow" style={{ 'transform': `rotate(${windDirection}deg)` }}>
      <div className="wind-arrow-top"></div></div>

      <img id="temp" src={compass} alt={"wind Direction"}  className="wind-speed-gauge"/>
      {windSpeed ? (<p className="wind-speed-gauge">{windSpeed.value}</p>) : (null)}
    </div>
  );
};

export default Wind;