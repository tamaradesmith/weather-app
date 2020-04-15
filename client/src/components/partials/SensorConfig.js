import React from 'react';

function SensorConfig(props) {

  const { device, node, sensorList, sensorCount } = props;


  if (device === undefined) {
    console.log('loading')
    return "Loading...";
  };

  return (
    <form id="sensorForm" className="SensorConfig config-form-sensor">
      <h4 className="config-sensor-header">Sensor Configure</h4>

      <p className="config-label">Node: </p><p className="config-field-sensor"> {node.name} </p>
      <p className="config-label">Device:</p><p className="config-field-sensor"> {device.name} </p>


      <label htmlFor="name" className="config-label">Sensor:</label>
      <input type="text" name="name" id="name" className="config-field-sensor" value={sensorList[sensorCount].name} readOnly></input>

      <label htmlFor="description" className="config-label">Description:</label>
      <input type="text" name="description" id="description" className="config-field-sensor"></input>

      <label htmlFor="type" className="config-label">Type:</label>
      <input type="text" name="type" id="type" className="config-field-sensor" value={sensorList[sensorCount].type} readOnly ></input>

      <label htmlFor="location" className="config-label">Location:</label>
      <input type="text" name="location" id="location" className="config-field-sensor" value={node.location} readOnly></input>

      <label htmlFor="min" className="config-label">Min Value:</label>
      <input type="text" name="min" id="min" value={parseFloat(sensorList[sensorCount].min).toFixed(2)} className="config-min" readOnly></input>

      <label htmlFor="max" className="config-label-max">Max Value:</label>
      <input type="text" name="max" id="max" value={parseFloat(sensorList[sensorCount].max).toFixed(2)} className="config-max" readOnly></input>

      <label htmlFor="unit" className="config-label-unit">Unit:</label>
      <input type="text" name="unit" id="unit" defaultValue={sensorList[sensorCount].unit} className="config-unit"></input>

      <label htmlFor="active" className="config-label">Active</label>
      <input type="checkbox" name="active" id="active" className="config-field-sensor config-checked" defaultChecked />

    </form>
  )
}

export default SensorConfig