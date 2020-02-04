import React, { useState } from "react"

function ConfigNodes(props) {
  return (
    <main className="ConfigNodes config-form">
      <label for="newItem">What been added? </label>
      <select>
        <option value=""></option>
        <option value="node">Node</option>
        <option value="device">Device</option>
        <option value="sensor">Sensor</option>
        <option value="controller">Controller</option>
      </select>
    </main>
  )
}
export default ConfigNodes