import React, { useState } from "react";
import { Node } from "../../js/requests"

function DeviceConfig(props) {

  const [nodes, setNodes] = useState(null);
  const [DeviceInfo, setDeviceInfo] = useState([])

  async function getNodes() {
    const nodes = await Node.getNodes();
    setNodes(nodes)
  }

  function handleSubmit(event) {
    event.preventDefault();
    const { target } = event;
    const formData = new FormData(target);
    const newDevice = {
      name: formData.get("name"),
      description: formData.get("description"),
      type: formData.get("type"),
      active: (formData.get(`active`) === "on") ? true : false,
    }
    console.log("TCL: handleSubmit -> newDevice", newDevice)
  }

  if (nodes === null) {
    getNodes()
    return "loading..."
  }

  return (
    <form className="DeviceConfig config-form" onSubmit={handleSubmit}>
    <h4 className="config-header">Device Configure</h4>
      <label htmlFor="node" className="config-label" >Node</label>
      <select name="node" className="config-field config-select">
        {nodes.map((node, index) => (
          <option key={index} value={node.id}>{node.name}</option>
        ))}
      </select>
      <label htmlFor="name" className="config-label" >Device Name: </label>
      <input type="text" name="name" id="name" placeholder="Enter device name" className="config-field"></input>
      <label htmlFor="description" className="config-label" >Device description: </label>
      <input type="text" name="description" id="description" placeholder="Enter device description" className="config-field"></input>
      <label htmlFor="type" className="config-label" >Device Type: </label>
      <input type="text" name="type" id="type" placeholder="Enter device type" className="config-field"></input>
      <label htmlFor="active">Active</label>
      <input type="checkbox" name="active" id="active" className="config-field config-checked" defaultChecked />
      <button type="submit" className="config-button" > Create Device</button>

    </form>
  )
}

export default DeviceConfig;