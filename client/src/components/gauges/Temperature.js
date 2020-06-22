import React, { useState, useEffect } from 'react';

import thermometer from "../../images/thermometer.png"
import { Sensor } from '../../js/requests';

// const colours = ["#22AED1", "#B8F3FF", "#DEFFFC", "#FFF07C", '#FDCA40', '#F79824', "#FF7700", "##E55812", "#BA2D0B", "#A30000"]

const colours = ["#57C4E5", "#B8F3FF", "#DEFFFC", "#F4F1BB", "#FFF07C", "#F5BB00", "#EC9F05", "#D76A03", '#BF3100', "#A30000"]
function Temperature(props) {

  const { sensorId } = props;

  const [temperature, setTemperature] = useState(null);
  const [current, setCurrent] = useState(150);
  const [level, setLevel] = useState({ level: 8, color: 'lightblue' });

  const [highLow, setHighLow] = useState({});
  const [highLowLevel, setHighLowLevel] = useState({ high: 160, low: 150 });

  async function getReading() {
    const reading = await Sensor.getLastReading(sensorId);
    if (typeof (reading.value) === 'number') {
      setTemperature((reading.value).toFixed(0));
    }
  }


  function calulateLabel() {
    let colour = colours[3];
    if (temperature < 0) {
      setCurrent(60 - (Math.round(temperature * 1)));
      if (temperature < -15) {
        colour = colours[0];
      } else if (temperature < -5) {
        colour = colours[1];
      } else {
        colour = colours[2];
      }
      setLevel({ level: 70 - (1 * temperature), color: colour });

    } else if (temperature > 0) {
      setCurrent(60 - (Math.round(temperature * 1.375)));
      if (temperature < 5) {
        colour = colours[3];
      } else if (temperature < 10) {
        colour = colours[4];
      } else if (temperature < 15) {
        colour = colours[5];
      } else if (temperature < 20) {
        colour = colours[6];
      } else if (temperature < 25) {
        colour = colours[7];
      } else if (temperature < 30) {
        colour = colours[8];
      };
      setLevel({ level: 70 - (1.45 * temperature), color: colour });
    } else {
      setCurrent(60);
      setLevel({ level: 70, color: colours[3] });
    };
  };

  async function getHighsAndLows() {
    const highsAndLows = await Sensor.getHighsAndLows(sensorId);
    if (highsAndLows.low > 0) {
      highsAndLows.low = highsAndLows.low.toFixed(0);
      highsAndLows.low = ('0' + highsAndLows.low).slice(-2);
    } else {
      highsAndLows.low = highsAndLows.low.toFixed(0);
    }
    if (highsAndLows.high > 0) {
      highsAndLows.high = highsAndLows.high.toFixed(0);
      highsAndLows.high = ('0' + highsAndLows.high).slice(-2);
    } else {
      highsAndLows.high = highsAndLows.high.toFixed(0);
    }
    setHighLow((highsAndLows))
  };

  function calulateHighLowLevels() {
    const { low, high } = highLow;
    const result = {}

    if (low < 0) {
      result.low = 60 - (Math.round(low * 1));
    } else if (low > 0) {
      result.low = 60 - (Math.round(low * 1.375));
    } else {
      result.low = 60;
    };

    if (high < 0) {
      result.high = 60 - (Math.round(high * 1));
    } else if (high > 0) {
      result.high = 60 - (Math.round(high * 1.375));
    } else {
      result.high = 60;
    };


    setHighLowLevel(result)
  };

  useEffect(() => {
    if (sensorId) { getHighsAndLows() };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [temperature]);

  useEffect(() => {
    calulateHighLowLevels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [highLow]);

  useEffect(() => {
    calulateLabel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [temperature]);

  useEffect(() => {
    if (sensorId) { getReading(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sensorId]);


  return (

    <div id={sensorId} className="Temperature">
      <div className="thermometer-div">
        <p className="thermometer-labels"> 0- </p>
        <p className="thermometer-labels-hight"> 40-</p>
        <p className="thermometer-high" style={{ 'top': `${highLowLevel.high}%` }}>{highLow.high}&#8594; </p>
        <p className="thermometer-low" style={{ 'top': `${highLowLevel.low}%` }}>{highLow.low}&#8594;</p>
        <p className="thermometer-text" style={{ 'top': `${current}%` }}>	&larr;{temperature}</p>

        <div >
          <img id="temp" src={thermometer} alt={"spnner"} className="thermometer" style={{ 'background': `linear-gradient(transparent 0%, transparent ${level.level}%, ${level.color} ${level.level}% ` }} />
        </div>
      </div>
    </div>
  )
}
export default Temperature;
