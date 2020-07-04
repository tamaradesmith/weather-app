import React, { useState, useEffect } from 'react';

import { Display, Sensor } from '../js/requests';

import Temperature from './gauges/Temperature';
import Humidily from './gauges/Humidity';
import Wind from './gauges/Wind';
import Rainfall from './gauges/Rainfall';
import SkyColour from './gauges/SkyColour';


function DashboardOutside(props) {

  const [displaySensors, setDisplaySensors] = useState([]);
  const [rainAmount, SetRainAmount] = useState({});
  const [loading, setLoading] = useState(true);


  async function getDisplaySensors() {
    const user = 1;
    const sensors = await Display.getDisplaySensors('outside', user)
    setDisplaySensors(sensors);
  };

  async function getRainReadings() {
    const reading = await Sensor.getLastReading(displaySensors.rainfallSensor);
    const dailyRain = await getTotalDaily();
    SetRainAmount({ hourly: reading.value, daily: dailyRain });
  }

  async function getTotalDaily() {
    const readings = await Sensor.getLast24Readings(displaySensors.rainfallSensor);
    let total = 0;
    readings.forEach(reading => {
      total += reading.value
    });
    return total;
  };

  function addListeners() {
    const sensors = document.querySelectorAll(".sensor");
    sensors.forEach(sensor => {
      sensor.addEventListener('click', (event) => {
        const id = event.target.closest('.sensor').id;
        props.history.push(`/sensor/${id}`);
      })
    })
  }

  useEffect(() => {
    getDisplaySensors();
    // getSiteFromCookies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (displaySensors.rainfallSensor) { getRainReadings(); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displaySensors]);

  useEffect(() => {
    addListeners();
  }, [loading === false])


  return (
    <main className='DashboardOutside site'>
      <h1 className='site-header'>{displaySensors.site}: Outside </h1>


      <div className="site-temperature">
        <h3 className="site-sensor-header">Temperature</h3>
        <div id="temperatureInside" className="column-1">
          <Temperature sensorId={displaySensors.temperatureOutside} />
        </div>
        <h4 className="site-label">--Outside--</h4>
        <div id="temperature-outside" className="column-2">
          <Temperature sensorId={displaySensors.temperatureShade} />
        </div>
        <h4 className="site-label">--Shade--</h4>
      </div>

      <div className="site-wind" style={{ "width": "300px", "height": '300px' }}>
        <h3 className="site-sensor-header">Wind</h3>
        <div>
          <Wind sensorDirection={displaySensors.windDirection} sensorSpeed={displaySensors.windSpeed} size={'200px'} />
        </div>
      </div>

      <div className="outside-humidily">
        <h3 className="site-sensor-header">Humidily</h3>
        <div className="site-humidily-gauge">
          <Humidily sensorId={displaySensors.humidily} size={"70px"} />
        </div>
      </div>

      <div className="outside-rain">
        <h3 className="site-sensor-header">Rain</h3>
        <div className="column-1">
          <Rainfall amount={rainAmount.hourly} label={30} size={'70px'} />
        </div>
        <h4 className="site-label">--Hourly--</h4>
        <div className="column-2">
          <Rainfall amount={rainAmount.daily} label={60 * 2} size={'70px'} />
        </div>
        <h4 className="site-label">--Daily--</h4>
      </div>

      <div className="outside-sky-colour">
        <h3 className="site-sensor-header">Sky Colour</h3>
        <SkyColour sensors={[{ red: displaySensors.skyRed }, { green: displaySensors.skyGreen }, { blue: displaySensors.skyBlue }]} />
      </div>

    </main>
  );
};
export default DashboardOutside;