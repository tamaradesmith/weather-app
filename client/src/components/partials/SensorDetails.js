import React from 'react';

function SensorDetails(props) {
  const { devices } = props;
  
  function handleChange(event){
    const target = event.target
    props.activeUpdate("sensor", target.id, target.checked)
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

            {device.sensors.map((sensor)=>(
              <div key={sensor.id} className="show-grid-sensor-inner">
                <p> {sensor.name} </p>
                <p> {sensor.type} </p>
                <p> {sensor.description} </p>
                <input type="checkbox" id={sensor.id} defaultChecked={sensor.active === true ? true : false} className="show-check" onChange={handleChange} />
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