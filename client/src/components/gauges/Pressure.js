import React, { useState, useEffect } from "react";
import { Sensor } from "../../js/requests";

import pressureIcon from '../../images/airPressure.png';

function Pressure(props) {
  const { sensorId, size} = props;
  const [pressure, setPressure] = useState(null);

  async function getLastReading() {
    const reading = await Sensor.getLastReading(sensorId);
    setPressure(reading.value);
  }

  useEffect(() => {
    if (sensorId !== undefined) { getLastReading() };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sensorId]);


  return (
    <div className="Pressure">
    <p> {pressure}</p>
      <img src={pressureIcon} alt={"Air Pressure Icon"} style={{'width': size}} />
    </div>
  );
};

export default Pressure;

