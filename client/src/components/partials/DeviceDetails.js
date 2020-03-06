import React from 'react';


function DeviceDeatails(props) {

  const { devices } = props;

  return (
    <div>
      {devices.map((device, index) => (
        <div key={index} className="show-grid">
          <p>
            {device.name}
          </p>
          <p>
            {device.location}
          </p>
          <p>
            {device.type}
          </p>


        </div>
      ))}
      <p>DeviceDeatails</p>
    </div>
  )
}


export default DeviceDeatails;