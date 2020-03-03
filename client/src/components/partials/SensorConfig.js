import React, { useEffect } from 'react';
import { Device, Sensor } from '../../js/requests'

function SensorConfig(props) {

  const { device, node, sensorList, sensorCount } = props
  console.log("SensorConfig -> device", device)

  function handleNext(event) {
    event.preventDefault();
    const sensor = sensorList[sensorCount];
    const sensorForm = document.querySelector("#sensorForm");
    const inputs = sensorForm.querySelectorAll('input');
    const formData = new FormData(sensorForm);
    const newSensor = {
      device_id: device.id,
      name: sensor.name,
      type: sensor.type,
      location: node.location,
      description: formData.get('description'),
      min: sensor.min,
      max: sensor.max,
      unit: formData.get('unit'),
      active: (formData.get(`active`) === "on") ? true : false,
    }
    checkFields(newSensor, sensorForm, inputs)
  }

  function checkFields(sensor, target, inputs) {
    let flag = true
    inputs.forEach(input => {
      if (input.value === "") {
        input.classList.add('warning');
        flag = false;
      } else {
        input.classList.remove('warning');
      };
    });
    if (flag === true) {
      createSensor(sensor, target)
    }
  }
  

  async function createSensor(sensor, target) {
    const saveSensor = await props.handleNext(sensor);
    target.reset();
  }

  function handleCancel(event) {
    props.cancel();
  }



  return (
    <form id="sensorForm" className="SensorConfig config-form-sensor">
      <h4 className="config-sensor-header">Sensor Configure</h4>

      <p className="config-label">Node: </p><p className="config-field-sensor"> {node.name} </p>
      <p className="config-label">Device:</p><p className="config-field-sensor"> {device.name} </p>


      <label htmlFor="name" className="config-label">Sensor:</label>
      <input type="text" name="name" id="name" className="config-field-sensor" value={sensorList[sensorCount].name} readOnly></input>

      <label htmlFor="description" className="config-label">description:</label>
      <input type="text" name="description" id="description" className="config-field-sensor"></input>

      <label htmlFor="location" className="config-label">Location:</label>
      <input type="text" name="location" id="location" className="config-field-sensor" value={node.location} readOnly></input>


      <label htmlFor="min" className="config-label">Min Value:</label>
      <input type="text" name="min" id="min" value={sensorList[sensorCount].min} className="config-min" readOnly></input>

      <label htmlFor="max" className="config-label-max">Max Value:</label>
      <input type="text" name="max" id="max" value={sensorList[sensorCount].max} className="config-max" readOnly></input>

      <label htmlFor="unit" className="config-label-unit">Unit:</label>
      <input type="text" name="unit" id="unit" defaultValue={sensorList[sensorCount].unit} className="config-unit"></input>

      <label htmlFor="active" className="config-label">Active</label>
      <input type="checkbox" name="active" id="active" className="config-field-sensor config-checked" defaultChecked />

      <button id="cancel" className="config-sensor-button" onClick={handleCancel} > Cancel</button>

      <button type="submit" className="config-submit-sensor-button" onClick={handleNext} > Next </button>

    </form>
  )
}

export default SensorConfig