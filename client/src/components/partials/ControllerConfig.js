import React, { useState } from 'react';
import { Device, Controller } from '../../js/requests'

function ControllerConfig(props) {

  const [devices, setDevices] = useState(null);
  // const [existingController, setExistingController] = useState(null);
  const [controllerTypes, setControllerTypes] = useState(null);

  async function getDevices() {
    const devices = await Device.getDevices();
    setDevices(devices)
  }

  async function getExistingControllersTypes() {
    const controller = await Controller.getControllerTypes();
    setControllerTypes(controller);
  }


  function handleSubmit(event) {
    event.preventDefault();
    const { target } = event;
    const formData = new FormData(target);
    const newController = {
      device_id: formData.get('device'),
      name: formData.get('name'),
      type: formData.get('type'),
      propose: formData.get('propose'),
      active: (formData.get(`active`) === "on") ? true : false,
    }
    console.log("TCL: handleSubmit -> newController", newController)
  }

  if (devices === null) {
    getDevices();
    return "Loading"
  }
  if (controllerTypes === null) {
    getExistingControllersTypes();
    return "Loading..."
  }


  return (
    <form className="ControllerConfig config-form" onSubmit={handleSubmit}>
      <h4 className="config-sensor-header">Controller Configure</h4>
    <label htmlFor="device" className="config-label">Device: </label>
      <select name="device" className="config-field-sensor config-select">
      <option > </option>
        {devices.map((device, index) => (
          <option key={index} value={device.id}>{device.name}</option>
        ))}
      </select>
      <label htmlFor="name" className="config-label">Name:</label>
      <input type="text" name="name" id="name" className="config-field-sensor" ></input>
      
      <label htmlFor="type" className="config-label">Type:</label>
      <select name="type" className="config-field-sensor config-select">
        <option ></option>
        {controllerTypes.map((type, index) => (
          <option key={index} value={type} >{type}</option>
        ))}
        <option value="other"> Other</option>
      </select>

      <label htmlFor="propose" className="config-label">Propose:</label>
      <input type="text" name="propose" id="propose" className="config-field-sensor"></input>


      <label htmlFor="active" className="config-label">Active</label>
      <input type="checkbox" name="active" id="active" className="config-field-sensor config-checked" defaultChecked />

      <button id="cancel" className="config-sensor-button" > Cancel</button>

      <button type="submit" className="config-submit-sensor-button" > Create Sensor</button> 

    </form>
  )
}

export default ControllerConfig