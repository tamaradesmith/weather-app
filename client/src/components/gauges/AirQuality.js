import React, { useState, useEffect } from 'react';

import { Sensor } from '../../js/requests';

const rating = [{ level: 'Hazardous', colour: "#6B0F1A", background: '#6b0f1a80' }, { level: "Very Unhealthy", colour: "#AC3920", background: "#AC392080" }, { level: "	Unhealthy", colour: "#CA5310", background: "#CA531080" }, { level: "Moderate", colour: "#FFDD33", background: "#FFDD3380" }, { level: 'Good', colour: "#11BB63", background: "#11BB6380" }]

function AirQuality(props) {

  const { sensorId } = props;
  console.log("AirQuality -> sensorId", sensorId);

  const [airQuality, setAirQuality] = useState('');
  const [level, setlevel] = useState({level: undefined, colour: "#6B0F1A", background: '#6b0f1a80' });

  async function getAirQualityReading() {
    const reading = await Sensor.getLastReading(sensorId)
    console.log("getAirQualityReading -> reading", reading);
    setAirQuality(reading.value);
  };

  function setLevel() {
    console.log("setLevel -> airQuality", airQuality);
    setLevel(rating[4])
  }

  useEffect(() => {
    if (sensorId) {
      getAirQualityReading();
      console.log("hi")
    };
  }, [sensorId]);

  // useEffect(() => {
  //   console.log("meow")
  //   setLevel();

  // }, [level.level === undefined])

  return (
    <div className="AirQuality air-quality-icon" style={{ 'borderColor': level.colour, 'background': level.background }}>
      <p> {airQuality} {level.level}</p>
    </div>
  );
};

export default AirQuality;