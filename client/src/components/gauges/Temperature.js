import React, { useState, useEffect } from 'react';

import thermometer from "../../images/thermometer.png"
import { Sensor } from '../../js/requests';


function Temperature(props) {

  const { sensor } = props;
  const [temperature, setTemerature] = useState(null);
  const [current, setCurrent] = useState(150);
  const [level, setLevel] = useState({ level: 8, color: 'lightblue' });

  const [highLow, setHighLow] = useState({});
  const [highLowLevel, setHighLowLevel] = useState({ high: 160, low: 150 });

  async function getLastReading() {
    const reading = await Sensor.getLastReading(sensor.id)
    if (typeof (reading.value) === "number") {
      setTemerature((reading.value).toFixed(0))
    }
  }

  function calulateLabel() {
    if (temperature < 0) {
      setCurrent(150 - (Math.round(temperature * 3.5)));
      setLevel({ level: 55 - (1.175 * temperature), color: "blue" });
    } else if (temperature > 0) {
      setCurrent(150 - (Math.round(temperature * 3.5)));
      if (temperature < 15) {
        setLevel({ level: 55 - (1.175 * temperature), color: "yellow" });
      } else {
        setLevel({ level: 55 - (1.175 * temperature), color: "red" });
      };
    } else {
      setCurrent(150);
      setLevel({ level: 55, color: "lightblue" });
    };
  };

  async function getHighsAndLows() {
    const highsAndLows = await Sensor.getHighsAndLows(sensor.id)
    highsAndLows.low = highsAndLows.low.toFixed(0);
    highsAndLows.high = highsAndLows.high.toFixed(0);
    setHighLow((highsAndLows))
  };

  function calulateHighLowLevels() {
    const { low, high } = highLow;
    const result = {}
    if (low < 0) {
      result.low = 150 + (Math.round(low * 3.5));
    } else if (low > 0) {
      result.low = 150 - (Math.round(low * 3.5));
    } else {
      result.low = 150;
    };

    if (high < 0) {
      result.high = 150 + (Math.round(high * 3.5));
    } else if (high > 0) {
      result.high = 150 - (Math.round(high * 3.5));
    } else {
      result.high = 150;
    };
    setHighLowLevel(result)
  };

  useEffect(() => {
    getHighsAndLows()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [highLow === null]);

  useEffect(() => {
    calulateHighLowLevels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [highLow]);

  useEffect(() => {
    calulateLabel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [temperature]);
  
  useEffect(() => {
    getLastReading();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [temperature === null])

  return (

    <div className="Temperature">

      <div className="thermometer-div">
        <p className="thermometer-labels"> 0- </p>
        <p className="thermometer-labels-hight"> 40- </p>
        <p className="thermometer-high" style={{ 'top': `${highLowLevel.high}px` }}>{highLow.high}- </p>
        <p className="thermometer-low" style={{ 'top': `${highLowLevel.low}px` }}>{highLow.low}-</p>

        <p className="thermometer-text" style={{ 'top': `${current}px` }}>-{temperature}</p>


        <div >

          <img id="temp" src={thermometer} alt={"spnner"} className="thermometer" style={{ 'background': `linear-gradient(transparent 0%, transparent ${level.level}%, ${level.color} ${level.level}% ` }} />
        </div>
      </div>
      <h4 className="gauge-header">{sensor.name}</h4>

    </div>
  )
}
export default Temperature;
