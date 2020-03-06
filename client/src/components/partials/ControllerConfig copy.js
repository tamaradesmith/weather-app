import React, { useState } from 'react';
import { Device, Controller } from '../../js/requests'

function ControllerConfig(props) {

  const [devices, setDevices] = useState(null);
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
    const controller = document.querySelector("#controllerForm");
    const inputs = controller.querySelectorAll('select, input');
    const formData = new FormData(controller);
    const newController = {
      device_id: formData.get('device'),
      name: formData.get('name'),
      type: formData.get('type'),
      propose: formData.get('propose'),
      active: (formData.get(`active`) === "on") ? true : false,
    }
  checkFields(newController, controller, inputs);
  };

  function handleCancel(event){
    event.preventDefault();
    props.cancel();
  };

  function checkFields(controller, target, inputs){
    let flag = true;
    inputs.forEach(input =>{
      if (input.value === ""){
        input.classList.add('warning');
        flag = false
      } else {
        input.classList.remove('warning');
      }
    })
    if(flag === true){
      props.create('controller', controller);
      target.reset();
    }
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
    <form id="controllerForm" className="ControllerConfig config-form" >
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

      <button id="cancel" className="config-sensor-button" onClick={handleCancel} > Cancel</button>

      <button type="submit" className="config-submit-sensor-button" onClick={handleSubmit} > Create Sensor</button> 

    </form>
  )
}

export default ControllerConfig