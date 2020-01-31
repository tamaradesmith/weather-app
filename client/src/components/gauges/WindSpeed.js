import React, { useState } from 'react';
import { Sensor } from '../../js/requests';
import JqxGauge from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxgauge';


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
    <div className="WindSpeed wind-div">
      <h4 className="gauge-header wind-header">{sensor.name}</h4>
      <JqxGauge
        value={windSensor.value}
        min={sensor.minValue}
        max={sensor.maxValue} startAngle={50}
        endAngle={320}
        radius={150}
        width={300}
        border={{ visible: false }}
        labels={{
          position: 'outside', distance: '25px', ticksDistance: '1px', offset: [0, -12]
        }}
        ticksMinor={{ interval: 10, size: '5%' }}
        ticksMajor={{ interval: 30, size: '10%' }}
        style={{ fontSize: ".7em" }}
        pointer={{ pointerType: 'rectangle', style: { fill: 'black', stroke: '#ff0000' }, length: '80%', width: '2%', visible: true }}
        cap={{ visible: false }}
        ranges={ranges}
      />
    </div>
  )
}

const ranges = [
  { startValue: 0, endValue: 50, style: { fill: '#4bb648', stroke: '#4bb648' }, endWidth: 5, startWidth: 5 },
  { startValue: 50, endValue: 100, style: { fill: '#fbd109', stroke: '#fbd109' }, endWidth: 5, startWidth: 5 },
  { startValue: 100, endValue: 150, style: { fill: '#ff8000', stroke: '#ff8000' }, endWidth: 5, startWidth: 5 },
  { startValue: 150, endValue: 200, style: { fill: '#e02629', stroke: '#e02629' }, endWidth: 5, startWidth: 5 },
]

export default WindSpeed


// 'startDistance [optional]' - this property is measured in pixels or percentage.It indicates the distance from the gauge's outer boundary to the start of the range
