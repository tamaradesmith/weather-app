import React, { useState } from "react";
import { Node } from "../../js/requests"

function DeviceConfig(props) {

  const [nodes, setNodes] = useState(null);
  const [deviceList, setDeviceList] = useState([]);

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
  async function handleSelectNode(event) {
    const { target } = event;
    const deviceInfo = await Node.getDevices(target.value)
    setDeviceList(deviceInfo);
    document.querySelector("#device-name").classList.add("config-form");
    document.querySelector("#device-name").classList.remove("hidden");
  };

  function handleSelectDevice(event) {
    const { target } = event;
    deviceList.forEach((device, index) => {
      if (target.value === device.name) {
        document.querySelector("#type").value = deviceList[index].type;
      };
    });
    document.querySelector("#device-info").classList.remove("hidden");
    document.querySelector("#device-info").classList.add("config-form");
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
    if (flag === true) {

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
      <select name="node" className="config-field config-select" onChange={handleSelectNode}>
        <option value=''></option>
        {nodes.map((node, index) => (
          <option key={index} value={node.id}>{node.name}</option>
        ))}
      </select>

      <div id="device-name" className="config-div hidden">
        <label htmlFor="name" className="config-label " >Device: </label>
        <select name="name" id="name" className="config-field config-select " onChange={handleSelectDevice}>
          <option value=""></option>
          {deviceList.map((device, index) => (
            <option key={index} value={device.name}>{device.name}</option>
          ))}
        </select>
      </div>
      <div id="device-info" className=" config-div hidden">

        <label htmlFor="type" className="config-label" >Type: </label>
        <input type="text" name="type" id="type" placeholder="Enter device type" className="config-field"></input>

        <label htmlFor="description" className="config-label" >Description: </label>
        <input type="text" name="description" id="description" placeholder="Enter device description" className="config-field"></input>

        <label htmlFor="active">Active</label>
        <input type="checkbox" name="active" id="active" className="config-field config-checked" defaultChecked />

        <button id="cancel" className="config-button config-cancel" onClick={handleCancel}>Cancel</button>

        <button type="submit" className="config-button config-submit" onClick={handleSubmit} >Create Device</button>
      </div>
    </form>
  )
}

export default DeviceConfig;