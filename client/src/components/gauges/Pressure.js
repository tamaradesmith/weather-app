import React, { useState } from "react";
import { Sensor } from "../../js/requests";
import JqxLinearGauge from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxlineargauge'

function Pressure(props) {
  const { sensor } = props;
  const [pressure, setPressure] = useState(null);

  async function getLastReading() {
    const reading = await Sensor.getLastReading(sensor.id);
    console.log("getLastReading -> reading", reading);
    setPressure(reading.value);
  }

  if (pressure === null) {
    getLastReading();
    return "Loading";
  }


  return (
    <div className="Pressure">
      <h4 className="gauge-header">{sensor.name}</h4>
      {pressure !== "none" ? (
<>
      <JqxLinearGauge value={pressure} ranges={ranges} style={{ margin: '0 auto', float: 'left', fontSize: "1em" }}
        width={175} height={315} max={pressure + 8} min={pressure-6} pointer={pointerStyle}
        animationDuration={1500}
        background={{ visible: false }}
        labels={{
          position: 'near', fontSize: '20px', offset: 8, interval: 2,
        }}
        ticksMajor={{size: '10%', interval: 1, style: {stroke: '#A1A1A1', 'stroke-width': 1 }, visible: true } }
        ticksMinor={{ size: '5%', interval: .25, style: { stroke: '#A1A1A1', 'stroke-width': 1 }, visible: true }}
   />
      <p className="temperature-label">
        Current: {pressure}
      </p>
      </>
      ) : (
        <p> No Reading </p>
      )}
    </div>
  );
};

export default Pressure;

const ranges = [
  { startValue: 0, endValue: 90, style: { fill: '#A3D5FF', stroke: '#A3D5FF', width: '10px' } },
  { startValue: 90, endValue: 100, style: { fill: '#D9F0FF', stroke: '#D9F0FF', width: '10px' } },
  { startValue:100, endValue: 101, style: { fill: '#ECCE8E', stroke: '#ECCE8E', width: '10px' } },
  { startValue: 101, endValue: 102, style: { fill: '#EAD637', stroke: '#EAD637', width: '10px' } },
  { startValue: 102, endValue: 103, style: { fill: '#FFA200', stroke: '#FFA200', width: '10px' } },
  { startValue: 103, endValue: 150, style: { fill: '#FF4800', stroke: '#FF4800', width: '10px' } }
];
const pointerStyle = {
  pointerType: 'arrow',
  style: { fill: '#554477', stroke: '#050505' },
  size: '10%',
  offset: 3,
  visible: true
}
