import React from 'react';

function ControllerDetails(props) {
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
        <div className='show-detail-div'>
          {devices.map((device, index) => (
            <div key={index}>
              {device.controllers.length > 0 ? (
                <>
                  <p className='show-header-table'> Device: {device.name} </p>
                  {device.controllers.map(controller => (
                    <div key={controller.id} className="show-grid-sensor-inner">
                      <>
                        <p> {controller.name} </p>
                        <p> {controller.type} </p>
                        <p> {controller.description} </p>
                        <input type="checkbox" id="controller-active" defaultChecked={controller.active === true ? true : false} className="show-check" />
                      </>
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


export default ControllerDetails