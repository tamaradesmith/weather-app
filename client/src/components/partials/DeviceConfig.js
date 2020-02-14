import React, { useState } from "react";
import { Node } from "../../js/requests"

function DeviceConfig(props) {

  const [nodes, setNodes] = useState(null);

  async function getNodes() {
    const nodes = await Node.getNodes();
    setNodes(nodes);
  };

  function handleSubmit(event) {
    event.preventDefault();
    const device = document.querySelector('#deviceForm');
    const inputs = device.querySelectorAll('input, select');
    const formData = new FormData(device);
    const newDevice = {
      node_id: formData.get('node'),
      name: formData.get("name"),
      description: formData.get("description"),
      type: formData.get("type"),
      active: (formData.get(`active`) === "on") ? true : false,
    };
    checkFields(newDevice, device, inputs);
  }

  function handleCancel(event) {
    event.preventDefault();
    props.cancel();
  }

  function checkFields(device, target, inputs) {
    let flag = true;
    inputs.forEach(input => {
      if (input.value === "") {
        input.classList.add('warning');
        flag = false
      } else {
        input.classList.remove('warning');
      };
    });
    if (flag === true){
 
      props.create('device', device);
      target.reset();
    }
  }

  if (nodes === null) {
    getNodes();
    return "loading..."
  }

  return (
    <form id="deviceForm" className="DeviceConfig config-form" >
      <h4 className="config-header">Device Configure</h4>

      <label htmlFor="node" className="config-label" >Node</label>
      <select name="node" className="config-field config-select">
        <option value=''></option>
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

      <button id="cancel" className="config-button config-cancel" onClick={handleCancel}>Cancel</button>

      <button type="submit" className="config-button config-submit" onClick={handleSubmit} >Create Device</button>

    </form>
  )
}

export default DeviceConfig;