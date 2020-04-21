import React from "react";

function PropertyDetails(props) {
  const { devices } = props;

  function handleChange(event) {
    props.activeUpdate("property", event.target.id, event.target.checked);
  };

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
            <div key={index}>
              {device.properties.length > 0 ? (
                <>
                  <p className='show-header-table'> Device: {device.name} </p>
                  {device.properties.map(property => (
                    <div key={property.id} className="show-grid-sensor-inner">
                      <p>{property.name}</p>
                      <p>{property.type}</p>
                      <p>{property.description}</p>
                      <input type="checkbox" id={property.id} defaultChecked={property.active === true ? true : false} className="show-check" onChange={handleChange} />
                    </div>
                  ))}
                </>
              ) : (null)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;