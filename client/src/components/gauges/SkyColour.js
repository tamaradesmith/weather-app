import React, { useEffect, useState } from 'react';
import { Sensor } from '../../js/requests';

function SkyColour(props) {

  const { sensors } = props;
  const [colourReading, setColourReading] = useState({ red: 90, green: 100, blue: 255 });

  async function getColourReadings() {
    const colours = {}
    await Promise.all(sensors.map(async sensor => {
      const key = Object.keys(sensor);
      const result = await Sensor.getLastReading(sensor[key]);
      colours[key] = result.value;
    }));
    setColourReading(colours);
  };

  useEffect(() => {
    if (sensors !== undefined) { getColourReadings(); };
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sensors]);


  return (
    <div className="SkyColour">
      <div className='sky-div' style={{ 'backgroundColor': `rgb(${colourReading.red}, ${colourReading.green}, ${colourReading.blue})` }}>

      </div>
    </div>
  );
};

export default SkyColour;