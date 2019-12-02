import React, { useState } from 'react';
import { Sensor } from '../js/requests'
import './../../node_modules/jqwidgets-scripts/jqwidgets/styles/jqx.base.css'
import JqxGauge from './../../node_modules/jqwidgets-scripts/jqwidgets-react-tsx/jqxgauge';
import JqxKnob from './../../node_modules/jqwidgets-scripts/jqwidgets-react-tsx/jqxknob';
import JqxNumberInput from './../../node_modules/jqwidgets-scripts/jqwidgets-react-tsx/jqxnumberinput';



function Wind(props) {
  const [windDirection, setWindDirection] = useState(null);

  async function getWindSensor() {
    const windSensor = await Sensor.getWindDirection();
    console.log("TCL: getWindSensor -> windSensor", windSensor)
    setWindDirection((windSensor.value/5)+ 270)
  }
if (windDirection === null) {
  getWindSensor();
}
console.log("TCL: Wind -> windDirection", windDirection)
if (windDirection === null){
  return "Loading"
}
  return (
    <div>
       {/* <JqxGauge value={45} 
         ranges={ranges}  colorScheme={'scheme05'} animationDuration={1200} min={0} max={360}
       /> */}


      <JqxKnob 
      // ref={this.myKnob} onChange={this.onChange}
        value={windDirection} min={0} max={360} startAngle={270}
        endAngle={270+360} rotation={"clockwise"}
        styles={styles} marks={marks} labels={labels}
        pointer={pointer} 
  
      />

      <JqxNumberInput
      //  ref={this.myNumberInput} onValueChanged={this.onValueChanged}
        width={60} height={40} decimal={60} min={0} max={100}
        textAlign={"center"} decimalDigits={1} inputMode={"simple"}
      />


    </div>
  )
};

const ranges = [
  { startValue: 0, endValue: 90, style: { fill: '#4bb648', stroke: '#4bb648' }, endWidth: 5, startWidth: 1 },
  { startValue: 90, endValue: 180, style: { fill: '#fbd109', stroke: '#fbd109' }, endWidth: 10, startWidth: 5 },
  { startValue: 180, endValue: 270, style: { fill: '#ff8000', stroke: '#ff8000' }, endWidth: 13, startWidth: 10 },
  { startValue: 270, endValue: 0, style: { fill: '#e02629', stroke: '#e02629' }, endWidth: 16, startWidth: 13 }
]


const styles = {
  fill: {
    color: '#fefefe',
    gradientStops: [[0, 1], [50, 0.9], [100, 1]],
    gradientType: "linear"
  },
  stroke: '#dfe3e9', strokeWidth: 3
};
const marks = {
  colorProgress: { border: '#00a4e1', color: '#00a4e1' },
  colorRemaining: { border: 'grey', color: 'grey' },
  majorInterval: 30, majorSize: '9%', minorInterval: 5,
  offset: '71%', size: '6%', thickness: 3
};
const labels = {
  offset: '88%', step: 10, visible: true
};
const pointer = {
  offset: '0', size: '85%',
  style: { fill: '#00a4e1', stroke: 'grey' },
  thickness: 10, type: 'arrow'
};
const progressBar = {
  background: { fill: 'grey', stroke: 'grey' },
  offset: '60%', size: '9%',
  style: { fill: '#00a4e1', stroke: 'grey' }
};


export default Wind;