import React, { useState } from 'react';
import { Sensor } from '../../js/requests'
// import JqxGauge from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxgauge'

import compass from  '../../images/compass3.png';

function WindDirection(props) {

  const { sensorId } = props
  const [windDirection, setWindDirection] = useState(null);

  async function getWindSensorReading() {
    const windReading = await Sensor.getLastReading(sensorId);
    setWindDirection(windReading)
  }

  // if (windDirection === null) {
  //   getWindSensorReading();
  //   return "Loading"
  // }

  return (
    <div className="WindDirection wind-div">
      {/* <h4 className="gauge-header wind-header">{sensor.name} </h4> */}

      <img id="temp" src={compass} alt={"wind Direction"} />

    </div>
  )
};




export default WindDirection;