import React from 'react';


function DeviceDeatails(props) {

  const { devices } = props;

  function handleChange(event){
    props.activeUpdate("device", event.target.id, event.target.checked)
  }

  return (
    <div>
      <div className='show-grid-sensor-inner header'>
        <h3>Name</h3>
        <h3>Type</h3>
        <h3>Description</h3>
        <h3>Active</h3>
      </div>

      <div className="show-div">
        <div className="show-detail-div">

          {devices.map((device, index) => (
            <div key={index} className="show-grid-sensor-inner">
              <p>
                {device.name}
              </p>
              <p>
                {device.type}
              </p>
              <p>
                {device.description}
              </p>
              <input type="checkbox" id={device.id} defaultChecked={device.active === true ? true : false} className="show-check" onChange={handleChange} />

            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


export default DeviceDeatails;