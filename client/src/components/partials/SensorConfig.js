import React, { useState } from 'react';
import { Device, Sensor } from '../../js/requests'

function SensorConfig(props) {

  const [devices, setDevices] = useState(null);
  const [existingSensors, setExistingSensors] = useState(null);
  const [sensorTypes, setSensorTypes] = useState(null);

  async function getDevices() {
    const devices = await Device.getDevices();
    setDevices(devices)
  }

  async function getExistingSensorsTypes() {
    const sensors = await Sensor.getSensorsTypes();
    console.log("TCL: getExistingSensors -> sensors", sensors);
    setSensorTypes(sensors);
  }
  async function getExistingSensors() {
    const sensors = await Sensor.getSensors();
    setExistingSensors(sensors);
  }

  function handleSubmit(event) {

  }

  if (devices === null) {
    getDevices();
    return "Loading"
  }
  if (sensorTypes === null) {
    getExistingSensorsTypes();
    return "Loading..."
  }
  if (existingSensors === null) {
    getExistingSensors();
    return "Loading..."
  }

  return (
    <form className="SensorConfig config-form-sensor" onSubmit={handleSubmit}>
      <h4 className="config-sensor-header">Sensor Configure</h4>
      <label htmlFor="device" className="config-label">Device: </label>
      <select name="device" className="config-field-sensor config-select">
        {devices.map((device, index) => (
          <option key={index} value={device.id}>{device.name}</option>
        ))}
      </select>
      <label htmlFor="name" className="config-label">Name:</label>
      <input type="text" name="name" id="name" className="config-field-sensor"></input>

      <label htmlFor="type" className="config-label">Type:</label>
      <select name="type" className="config-field-sensor config-select">
        <option value=""></option>
        {sensorTypes.map((type, index) => (
          <option key={index} value={type} >{type}</option>
        ))}
      </select>

      <label htmlFor="propose" className="config-label">Propose:</label>
      <input type="text" name="propose" id="propose" className="config-field-sensor"></input>

      <label htmlFor="minValue" className="config-label">Min Value:</label>
      <input type="number" name="minValue" id="minValue" className="config-min"></input>

      <label htmlFor="maxValue" className="config-label-max">Max Value:</label>
      <input type="number" name="maxValue" id="maxValue" min="0" className="config-max"></input>

      <label htmlFor="unit" className="config-label-unit">Unit:</label>
      <input type="text" name="unit" id="unit" min="0" className="config-unit"></input>

      <label htmlFor="active" className="config-label">Active</label>
      <input type="checkbox" name="active" id="active" className="config-field-sensor config-checked" defaultChecked />

      <button id="cancel" className="config-sensor-button" > Cancel</button>

      <button type="submit" className="config-submit-sensor-button" > Create Sensor</button>

    </form>
  )
}

export default SensorConfig