import React, { useState } from 'react';
import { Sensor } from '../../js/requests';
import JqxLinearGauge from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxlineargauge';


function WindSpeed(props) {

  const { sensor } = props
  const [windSensor, setWindSensor] = useState(null);

  async function getWindSensorReading() {
    const reading = await Sensor.getLastReading(sensor.id);
    setWindSensor(reading)
  }
  if (windSensor === null) {
    getWindSensorReading();
    return 'loading'
  }
  return (
    <div className="WindSpeed">
      <div className="wind-thermometer">
        <h4 className="gauge-header  wind-header">{sensor.name}</h4>
        <div className="wind-linear">

        <JqxLinearGauge value={windSensor.value} ranges={ranges} style={{  fontSize: "1em",  }}
          width={125} height={315} max={sensor.maxValue} min={sensor.minValue} pointer={pointerStyle}
          animationDuration={1500}
          background={{ visible: false }}
          labels={{
            position: 'near', fontSize: '20px', offset: 10, interval:30
          }}
          ticksMinor={{ interval: 10, size: '5%' }}
          ticksMajor={{ interval: 30, size: '10%' }}
        />
        </div>

      </div>
    </div>
  )
}

const ranges = [
  { startValue: 0, endValue: 50, style: { fill: '#4bb648', stroke: '#4bb648' }, endWidth: 10, startWidth: 10 },
  { startValue: 50, endValue: 100, style: { fill: '#fbd109', stroke: '#fbd109' }, endWidth: 10, startWidth: 10 },
  { startValue: 100, endValue: 150, style: { fill: '#ff8000', stroke: '#ff8000' }, endWidth: 10, startWidth: 10 },
  { startValue: 150, endValue: 200, style: { fill: '#e02629', stroke: '#e02629' }, endWidth: 10, startWidth: 10 },
]
const pointerStyle = {
  pointerType: 'arrow',
  style: { fill: '#554477', stroke: '#050505' },
  size: '15%',
  offset: 3,
  visible: true
}

export default WindSpeed