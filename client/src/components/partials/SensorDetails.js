import React from 'react';

function SensorDetails(props) {
  const { devices } = props;

  return (
    <div>
      <div className='show-grid-sensor-inner header'>
        <h3>Name</h3>
        <h3>Type</h3>
        <h3>Description</h3>
        <h3> Active</h3>
      </div>

      <div className="show-div-sensor">
        <div className="show-detail-div">

          {devices.map((device, index) => (
            <div key={index} >
            <p className='show-header-table'>Device: {device.name}</p>

            {device.sensors.map((sensor)=>(
              <div key={sensor.id} className="show-grid-sensor-inner">
                <p> {sensor.name} </p>
                <p> {sensor.type} </p>
                <p> {sensor.description} </p>
                <input type="checkbox" id="sensor-active" defaultChecked={sensor.active === true ? true : false} className="show-check" />
              </div>

            ))}

            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SensorDetails