import React from 'react';

function ControllerConfig(props) {

  const { device, node, controllerList, controllerCount} = props;
console.log("render Controller Config")
  return (
    <form id="controllerForm" className="ControllerConfig config-form" >

      <h4 className="config-sensor-header">Controller Configure</h4>
      <p className="config-label">Node:</p>
      <p className="config-field-sensor"> {node.name} </p>
      <p className="config-label">Device:</p><p className="config-field-sensor"> {device.name} </p>

      <label htmlFor="name" className="config-label">Controller:</label>
      <input name="name" className="config-field-sensor config-select" value={controllerList[controllerCount].name} readOnly>
      </input>

      <label htmlFor="description" className="config-label">Description:</label>
      <input type="text" name="description" id="description" className="config-field-sensor"></input>

      <label htmlFor="type" className="config-label">Type:</label>
      <input type="text" name="type" id="type" className="config-field-sensor" value={controllerList[controllerCount].type} readOnly></input>
      
      <label htmlFor="location" className="config-label">Location:</label>
      <input type="text" name="location" id="location" className="config-field-sensor" value={node.location} readOnly></input>

      <label htmlFor="active" className="config-label">Active</label>
      <input type="checkbox" name="active" id="active" className="config-field-sensor config-checked" defaultChecked />

    </form>
  )
}

export default ControllerConfig