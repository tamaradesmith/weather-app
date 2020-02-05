import React, { useState, useEffect } from "react";
import NodeConfig from './partials/NodeConfig'
import DeviceConfig from './partials/DeviceConfig'

function DashboardConfig(props) {
  const [form, setForm] = useState(null);
  const [hidden, setHidden] = useState(false)

  function handleChange(value) {
    console.log("TCL: handleChange -> value", value)
    switch (value) {
      case 'node':
        setForm(<NodeConfig />)
        setHidden(true)
        break;
case 'device':
        setForm(<DeviceConfig />)
        setHidden(true)
  break
      default:
        console.log("hi Kittens")
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
      <DeviceConfig />
    </main>
  )
}
export default DashboardConfig