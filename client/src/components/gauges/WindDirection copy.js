import React, { useState } from 'react';
import { Sensor } from '../../js/requests'
import JqxGauge from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxgauge'

import compass from  '../../images/compass.png';

function WindDirection(props) {

  const { sensor } = props
  const [windDirection, setWindDirection] = useState(null);

  async function getWindSensorReading() {
    const windReading = await Sensor.getLastReading(sensor.id);
    setWindDirection(windReading)
  }

  if (windDirection === null) {
    getWindSensorReading();
    return "Loading"
  }
  return (
    <div className="WindDirection wind-div">
      <h4 className="gauge-header wind-header">{sensor.name} </h4>
      <JqxGauge value={windDirection.value}
        ranges={ranges}
        min={0}
        max={360}
        startAngle={270}
        endAngle={270 + 359.9}
        radius={150}
        width={300}
        border={{ visible: false }}
        labels={{
          position: 'outside', distance: '5px', ticksDistance: '5px', offset: [0, -10]
        }}
        ticksMinor={{ interval: 10, size: '5%', offset: '15px' }}
        ticksMajor={{ interval: 30, size: '10%', offset: '15px'  }}
        style={{ fontSize: ".7em" }}
        pointer={{ pointerType: 'rectangle', style: { fill: 'black', stroke: '#ff0000' }, length: '80%', width: '2%', visible: true }}
        cap={{ visible: false }}
      />

    </div>
  )
};

const ranges = [
  { startValue: 45, endValue: 90 + 45, style: { fill: '#4bb648', stroke: '#4bb648' }, endWidth: 5, startWidth: 5 },
  { startValue: 90 +45, endValue: 180 +45, style: { fill: '#fbd109', stroke: '#fbd109' }, endWidth: 5, startWidth: 5 },
  { startValue: 180+45, endValue: 270+45, style: { fill: '#ff8000', stroke: '#ff8000' }, endWidth: 5, startWidth: 5 },
  { startValue: 0 , endValue: 45, style: { fill: '#e02629', stroke: '#e02629' }, endWidth: 5, startWidth: 5 },
  { startValue: 315 , endValue: 360, style: { fill: '#e02629', stroke: '#e02629' }, endWidth: 5, startWidth: 5 }

]


export default WindDirection;