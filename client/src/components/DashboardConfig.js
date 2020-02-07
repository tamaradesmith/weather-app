import React, { useState, useEffect } from "react";
import NodeConfig from './partials/NodeConfig';
import DeviceConfig from './partials/DeviceConfig';
import SensorConfig from './partials/SensorConfig';
import ControllerConfig from './partials/ControllerConfig';


function DashboardConfig(props) {
  const [form, setForm] = useState(null);
  const [hidden, setHidden] = useState(false)

  function handleChange(value) {
    switch (value) {
      case 'node':
        setForm(<NodeConfig />)
        setHidden(true)
        break;
      case 'device':
        setForm(<DeviceConfig />)
        setHidden(true)
        break
      case 'sensor':
        setForm(<SensorConfig />)
        setHidden(true)
        break
      case 'controller':
        setForm(<ControllerConfig />)
        setHidden(true)
        break
      default:
        break;
    }
  }

  return (
    <main className="ConfigNodes config">
      <div className={hidden ? 'hidden' : null} >
        <label htmlFor="newItem">Select Type: </label>
        <select className="config-select " onChange={event => handleChange(event.target.value)}>
          <option value=""></option>
          <option value="node">Node</option>
          <option value="device">Device</option>
          <option value="sensor">Sensor</option>
          <option value="controller">Controller</option>
        </select>
      </div>
      <div className="inputs">
        {form}
      </div>
      <NodeConfig />
    </main>
  )
}
export default DashboardConfig