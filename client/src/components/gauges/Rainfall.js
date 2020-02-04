import React, { useState } from 'react';
import { Sensor } from '../../js/requests';
import RainGauge from './RainGauge';

function Rainfall(props) {

  const { sensor } = props;
  const [rainHour, setRainHour] = useState(null);
  const [rainDaily, setRainDaily] = useState(null);

  async function getLastReading() {
    const reading = await Sensor.getLastReading(sensor.id);
    setRainHour(reading.value)
  }

  async function getTotalDaily(){
    const readings = await Sensor.getLast24Readings(sensor.id)
    let total = 0;
    readings.forEach(reading => {
      total += reading.value
    });
    setRainDaily(total)
  }

  if (rainHour === null) {
  
    getLastReading();
    return "Loading";
  };

  if(rainDaily === null){
    getTotalDaily();
    return "loading"
  }

  return (
    <div>
      <h4 className="rain-gauge-header" >{sensor.name}</h4>
     <RainGauge amount={rainHour} label={["Hourly", 8, 4 , 0] }/>
     <RainGauge amount={rainDaily} label={["Daily", 60, 30, 0] }/>
    </div>
  );
};

export default Rainfall;