import React, { useEffect, useState } from "react";

import { Sensor } from '../js/requests';

function DashboardSite(props) {

  const [site, setSite] = useState('New Westminster');
  const [sensors, setSensors] = useState([]);

  async function getSensorsBySite() {
    const getSensors = await Sensor.getSensorsBySite(site);
    setSensors(getSensors);
  }


  useEffect(() => {
    getSensorsBySite();
  }, []);


  return (
    <main className="DashboardSite site">
      <h1 className="site-header ">{site}</h1>
      <div className="site-temperature">
        {sensors.map((sensor, index) => (
          <div key={index} className="site-item">
            {sensor.type === "temperature" ? (
              <>
                <p>{sensor.name}</p>
                <p>reading: 25</p>
              </>
            ) : (null)
            }
          </div>
        ))}


      </div>

    </main>
  );
};

export default DashboardSite