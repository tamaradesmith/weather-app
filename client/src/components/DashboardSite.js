import React, { useEffect, useState } from "react";

import { Sensor } from '../js/requests';

function DashboardSite(props) {

  const [site, setSite] = useState('New Westminster');
  const [sensors, setSensors] = useState([]);

  async function getSensorsBySite() {
    const getSensors = await Sensor.getSiteSensorsReading(site);
    console.log("getSensorsBySite -> getSensors", getSensors);
    setSensors(getSensors);
  }


  useEffect(() => {
    getSensorsBySite();
  }, []);


  return (
    <main className="DashboardSite site">
      <h1 className="site-header ">{site}</h1>
      <div className="site-temperature ">
        <h3 className="site-sensor-header">Temperature</h3>
        <h4 className="site-label">--Inside--</h4>
        <h4 className="site-label">--Outside--</h4>
        {sensors.map((sensor, index) => (
          <React.Fragment key={index}>
            {sensor.type === "temperature" && sensor.location === "inside" ? (
              <div key={index} className="column-1">
                <p className="site-reading-value"> {Math.round(sensor.reading.value * 10) / 10}</p>
                <p>{sensor.name}</p>
              </div>
            ) : (null)
            }
            {sensor.type === "temperature" && sensor.location === "outside" ? (
              <div key={index} className="column-2">
                <p id={sensor.id} className="site-reading-value">{Math.round(sensor.reading.value * 10) / 10}</p>
                <p>{sensor.name}</p>
              </div>
            ) : (null)
            }
          </React.Fragment>
        ))}


      </div>
      <div className=" site-humidily">
        <h3 className="site-sensor-header">Humidily</h3>
        <h4 className="site-label">--Inside--</h4>
        <h4 className="site-label">--Outside--</h4>
        {sensors.map((sensor, index) => (
          <React.Fragment key={index}>
            {sensor.type === "humidity" && sensor.location === "inside" ? (
              <div key={index} className="column-1">
                <p className="site-reading-value"> {Math.round(sensor.reading.value * 10) / 10}</p>
                <p>{sensor.name}</p>
              </div>
            ) : (null)
            }
            {sensor.type === "humidity" && sensor.location === "outside" ? (
              <div key={index} className="column-2">
                <p id={sensor.id} className="site-reading-value">{Math.round(sensor.reading.value * 10) / 10}</p>
                <p>{sensor.name}</p>
              </div>
            ) : (null)
            }
          </React.Fragment>
        ))}
      </div>

      <div className=" site-rain">
        <h3 className="site-sensor-header">Rain</h3>
        {sensors.map((sensor, index) => (
          <React.Fragment key={index}>
            {sensor.type === "distance" && sensor.location === "outside" ? (
              <div key={index} className="column-1">
                <p className="site-reading-value"> {Math.round(sensor.reading.value * 10) / 10}</p>
                <p>{sensor.name}</p>
              </div>
            ) : (null)
            }
          </React.Fragment>
        ))}

      </div>


      <div className=" site-cloud">
        <h3 className="site-sensor-header">Cloud Cover</h3>
        {sensors.map((sensor, index) => (
          <React.Fragment key={index}>
            {sensor.type === "distance" && sensor.location === "outside" ? (
              <div key={index} className="column-1">
                <p className="site-reading-value"> {Math.round(sensor.reading.value * 10) / 10}</p>
                <p>{sensor.name}</p>
              </div>
            ) : (null)
            }
          </React.Fragment>
        ))}
      </div>

      <div className=" site-pressure">
        <h3 className="site-sensor-header">Pressure</h3>
        <h4 className="site-label">--Inside--</h4>
        <h4 className="site-label">--Outside--</h4>

        {sensors.map((sensor, index) => (
          <React.Fragment key={index}>
            {sensor.type === "pressure" && sensor.location === "inside" ? (
              <div key={index} className="column-1">
                <p className="site-reading-value"> {Math.round(sensor.reading.value * 10) / 10}</p>
                <p>{sensor.name}</p>
              </div>
            ) : (null)
            }
            {sensor.type === "pressure" && sensor.location === "outside" ? (
              <div key={index} className="column-2">
                <p className="site-reading-value"> {Math.round(sensor.reading.value * 10) / 10}</p>
                <p>{sensor.name}</p>
              </div>
            ) : (null)
            }
          </React.Fragment>
        ))}
      </div>

      <div className=" site-wind">
        <h3 className="site-sensor-header">Wind</h3>
        <h4 className="site-label">--Speed--</h4>
        <h4 className="site-label">--Direction--</h4>

        {sensors.map((sensor, index) => (
          <React.Fragment key={index}>
            {sensor.type === "pressure" && sensor.location === "inside" ? (
              <div key={index} className="column-1">
                <p className="site-reading-value"> {Math.round(sensor.reading.value * 10) / 10}</p>
                <p>{sensor.name}</p>
              </div>
            ) : (null)
            }
            {sensor.type === "pressure" && sensor.location === "outside" ? (
              <div key={index} className="column-2">
                <p className="site-reading-value"> {Math.round(sensor.reading.value * 10) / 10}</p>
                <p>{sensor.name}</p>
              </div>
            ) : (null)
            }
          </React.Fragment>
        ))}
      </div>


    </main>
  );
};

export default DashboardSite