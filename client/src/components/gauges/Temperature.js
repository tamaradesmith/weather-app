import React, { useState } from 'react';
import JqxLinearGauge from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxlineargauge'
import { Sensor } from '../../js/requests';



function Temperature(props) {

  const { sensor } = props;
  const [temperature, setTemerature] = useState(null);
  const [highsLows, setHighLows] = useState(null);

  async function getLastReading() {
    const reading = await Sensor.getLastReading(sensor.id)
    setTemerature((reading.value).toFixed(0))
  }
  async function getHighsAndLows() {
    const highsAndLows = await Sensor.getHighsAndLows(sensor.id)
    setHighLows((highsAndLows))
  }
  if (highsLows === null) {
    getHighsAndLows()
    return 'loading';
  }
  if (temperature === null) {
    getLastReading()
    return "loading";
  }

  return (

    <div className="Temperature">
      <div className="temperature-thermometer">
        <h4 className="gauge-header">{sensor.name}</h4>
        <JqxLinearGauge value={temperature} ranges={ranges}
          style={{ margin: '0 auto', float: 'left', fontSize: "1em" }}
          width={100} height={300} max={40} min={-30} pointer={pointerStyle}
          animationDuration={1500}
          background={{ visible: false }}
          labels={{
            position: 'near', fontSize: '20px', offset: 8,
          }}
        />
        <p className="temperature-label">
          Current: {temperature}
        </p>
        <p className="temperature-range">
          high/low: {highsLows.high}/{highsLows.low}
        </p>
      </div>
    </div>
  )
}
export default Temperature;


const ranges = [
  { startValue: -30, endValue: -10, style: { fill: '#A3D5FF', stroke: '#A3D5FF', width: '10px' } },
  { startValue: -10, endValue: 5, style: { fill: '#D9F0FF', stroke: '#D9F0FF', width: '10px' } },
  { startValue: 5, endValue: 15, style: { fill: '#ECCE8E', stroke: '#ECCE8E', width: '10px' } },
  { startValue: 15, endValue: 22, style: { fill: '#EAD637', stroke: '#EAD637', width: '10px' } },
  { startValue: 22, endValue: 30, style: { fill: '#FFA200', stroke: '#FFA200', width: '10px' } },
  { startValue: 30, endValue: 40, style: { fill: '#FF4800', stroke: '#FF4800', width: '10px' } }
];
const pointerStyle = {
  pointerType: 'arrow',
  style: { fill: '#554477', stroke: '#050505' },
  size: '15%',
  offset: 3,
  visible: true
}