import React from 'react';


function DeviceDeatails(props) {

  const { devices, admin } = props;

  function handleChange(event) {
    const target = event.target;
    props.activeUpdate("device", target.id, target.checked, target.dataset.id)
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
              {admin ? (
                <input type="checkbox" id={device.id} data-id={index} defaultChecked={device.active === true ? true : false} className="show-check" onChange={handleChange} />
              ) : (<p>
                {device.active ? ("Actvie") : ("Disabled")}
              </p>
                )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


export default DeviceDeatails;