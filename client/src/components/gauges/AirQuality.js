import React, { useState, useEffect } from 'react';

import { Sensor } from '../../js/requests';

const rating = [{ level: 'Hazardous', colour: "#6B0F1A", background: '#6b0f1a80' },
{ level: "Very Unhealthy", colour: "#AC3920", background: "#AC392080" },
  { level: "	Unhealthy", colour: "#F56329", background: "#F5632980" },
{ level: "Moderate", colour: "#FFDD33", background: "#FFDD3380" },
{ level: 'Good', colour: "#11BB63", background: "#11BB6380" }]

function AirQuality(props) {

  const { sensorId } = props;

  const [airQuality, setAirQuality] = useState('');
  const [level, setLevel] = useState(rating[0]);

  async function getAirQualityReading() {
    const reading = await Sensor.getLastReading(sensorId)
    setAirQuality(reading.value);
  };

  function setLevelInfo() {
    if (airQuality <= 50) {
      setLevel(rating[4])
    } else if (airQuality <= 100) {
      setLevel(rating[3])
    } else if (airQuality <= 150) {
      setLevel(rating[2])
    } else if (airQuality <= 200) {
      setLevel(rating[1])
    } else {
      setLevel(rating[0])
    }
  }

  useEffect(() => {
    if (sensorId) {
      getAirQualityReading();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sensorId]);

  useEffect(() => {
    setLevelInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [airQuality]);

  return (
    <div className="AirQuality air-quality-icon sensor" style={{ 'borderColor': level.colour, 'background': level.background }}>
      <p> {airQuality}</p>
      <p> {level.level}</p>
    </div>
  );
};

export default AirQuality;