import React from 'react';

function SensorDetails(props) {
  const { devices, admin } = props;

  function handleChange(event) {
    const target = event.target;
    props.activeUpdate("sensor", target.id, target.checked, target.dataset.device, target.dataset.sensor)
  }

  return (
    <div>
      <div className='show-grid-sensor-inner header'>
        <h3>Name</h3>
        <h3>Type</h3>
        <h3>Description</h3>
        <h3> Active</h3>
      </div>

      <div className="show-div">
        <div className="show-detail-div">

          {devices.map((device, index) => (
            <div key={index} >
              <p className='show-header-table'>Device: {device.name}</p>
              {device.sensors.length > 0 ? (
                <>
                  {device.sensors.map((sensor, i) => (
                    <div key={i} className="show-grid-sensor-inner">
                      <p> {sensor.name} </p>
                      <p> {sensor.type} </p>
                      <p> {sensor.description} </p>
                      {admin ? (

                        <input type="checkbox" id={sensor.id} data-device={index} data-sensor={i} defaultChecked={sensor.active === true ? true : false} className="show-check" onChange={handleChange} />
                      ) : (
                          <p> {sensor.active ? ('Active') : ('Disabled')} </p>
                        )}
                    </div>
                  ))}
                </>
              ) : (null)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SensorDetails