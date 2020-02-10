import React, { useState} from "react";
import { Sensor } from "../../js/requests";
import humidityIcon from '../../images/humidityIcon.png'


function Humidity(props) {
  const { sensor } = props;
  const [humidityLevel, setHumidityLevel] = useState(null);

  async function getHumidityReading() {
    const humidity = await Sensor.getLastReading(sensor.id)
    setHumidityLevel(humidity.value);
  }

  if (humidityLevel === null) {
    getHumidityReading()
  };

  return (
    <div className="Humidily humidity-div">
      <h4 className="gauge-header">{sensor.name}</h4>
      <div id="humidity" className="humidity-gauge" style={{
        'backgroundImage': `linear-gradient(transparent 0%, transparent ${100 - (humidityLevel)}%, #2C7CB0 ${100 - (humidityLevel)}% ,#2C7CB0 100%)`
      }}>
        <img src={humidityIcon} alt={"logo"} className='humidity-img' />
      </div>
      <p className="humidity-text" >Humidily Level: {humidityLevel}%</p>

    </div>
  )
}

export default Humidity