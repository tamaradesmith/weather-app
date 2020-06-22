import React, { useState, useEffect } from 'react';
import { Sensor } from '../../js/requests';

import RainGauge from './RainGauge';

function Rainfall(props) {

  const { sensorId } = props;
  console.log("Rainfall -> sensorId", sensorId);
  
  const [rainHour, setRainHour] = useState(null);
  const [rainDaily, setRainDaily] = useState(null);

  async function getLastReading() {
    const reading = await Sensor.getLastReading(sensorId);
    console.log("getLastReading -> reading", reading);
    setRainHour(reading.value)
  }

  async function getTotalDaily() {
    const readings = await Sensor.getLast24Readings(sensorId);
    console.log("getTotalDaily -> readings", readings);
    let total = 0;
    readings.forEach(reading => {
      total += reading.value
    });
    setRainDaily(total)
  };

  useEffect(() => {
    if (sensorId !== undefined) {
      getLastReading();
      getTotalDaily();
    }
  }, [sensorId]);

  return (
    <div className="RainFall rain-div">
      <RainGauge amount={rainHour} label={["Hourly", 8, 4, 0]} />
      <RainGauge amount={rainDaily} label={["Daily", 60, 30, 0]} />
    </div>
  );
};

export default Rainfall;