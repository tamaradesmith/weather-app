import React, { useState, useEffect } from "react";
import NodeConfig from './partials/NodeConfig'

function ConfigNodes(props) {
  const [form, setForm] = useState(null);

  function handleChange(value) {
    console.log("TCL: handleChange -> value", value)
    switch (value) {
      case 'node':
        setForm(<NodeConfig />)
        break;

      default:
        console.log("hi Kittens")
        break;
    }
  }

  return (
    <main className="ConfigNodes config">
      <label htmlFor="newItem">Select Type: </label>
      <select className="config-select" onChange={event => handleChange(event.target.value)}>
        <option value=""></option>
        <option value="node">Node</option>
        <option value="device">Device</option>
        <option value="sensor">Sensor</option>
        <option value="controller">Controller</option>
      </select>
      <div className="inputs">
        {form}
      </div>
      <NodeConfig />
    </main>
  )
}
export default ConfigNodes