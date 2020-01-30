import React, { useState } from 'react';
import './../../node_modules/jqwidgets-scripts/jqwidgets/styles/jqx.base.css'
import JqxLinearGauge from './../../node_modules/jqwidgets-scripts/jqwidgets-react-tsx/jqxlineargauge';
import { Sensor } from '../js/requests';



function Temperature(props) {

  const [temperature, setTemerature] = useState(null);
  const [highsLows, setHighLows] = useState(null);

  async function getLastReading() {
    const reading = await Sensor.getLastReading(props.sensorId)
    setTemerature((reading.value).toFixed(0))
  }
  getLastReading(props.sensorId)

  async function getHighsAndLows(){
    const highsAndLows = await Sensor.getHighsAndLows(props.sensorId)
   
   setHighLows((highsAndLows))
    console.log("TCL: getHighsAndLows -> highsAndLows", highsAndLows)
  }
  if (highsLows === null){

    getHighsAndLows()
  }

  if (temperature === null) {
    return "loading";
  }

  return (

    <div className="Temperature">
      <h4>{props.name}</h4>
      <JqxLinearGauge value={temperature} ranges={ranges} style={{ marginLeft: '60px', float: 'left', fontSize: "1em" }}
        width={100} height={325} max={40} min={-30} pointer={pointerStyle}
        animationDuration={1500}
        background={{ visible: false }}
        labels={{
          position: 'near', fontSize: '20px', offset: 8,
        }}
      />
      <p className="temperature-label">
        {temperature}
      </p>
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
  size: '20%',
  offset: 3,
  visible: true
}