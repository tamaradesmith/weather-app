import React, { useState, useEffect } from "react";
import { Node, Device, Crud } from "../../js/requests"
import SensorConfig from './SensorConfig'

function DeviceConfig(props) {

  const [node, setNode] = useState('');
  const [deviceList, setDeviceList] = useState([]);
  const [count, setCount] = useState(0);
  // const fields = ["name", 'decription', 'type'];
  const [device, setDevice] = useState([]);


  async function getNode() {
    const nodeId = 1
    const node = await Node.getNode(nodeId);
    const deviceInfo = await Device.getDevicesOnNodeById(nodeId)
    setDeviceList(deviceInfo);
    setNode(node);
  };

  function handleCancel(event) {
    event.preventDefault();
    props.history.push(`/DashboardConfig`);
  }

  function handleNext(event) {
    event.preventDefault();
    checkDevice();
  };

  function checkDevice() {
    const device = document.querySelector('#deviceForm');
    const inputs = device.querySelectorAll('input');
    const formData = new FormData(device);
    const newDevice = {
      node_id: node.id,
      name: formData.get("name"),
      type: formData.get("type"),
      description: formData.get("description"),
      active: (formData.get(`active`) === "on") ? true : false,
    };
    checkFields(newDevice, device, inputs)
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
      createDevice("device", device);
    }
  }

  async function createDevice(type, info) {
    const device = await Crud.create(type, info);
    setDevice(device);
    setCount(count + 1);
    document.querySelector('#description').value = '';
    document.querySelector("#deviceForm").classList.add("hidden");
    

  }

  useEffect(() => {
    getNode();
  }, [node.length === 0])

  if (deviceList.length === 0) {
    return "loading"
  }

  return (
    <div>
    
      <form id="deviceForm" className="DeviceConfig config-form">
        <h3 className="config-header">Device Configure</h3>

        <p>Node:</p>
        <p> {node.name}</p>

        <label htmlFor="name" className="config-label"> Device: </label>
        <input type="text" name="name" id="name" value={deviceList[count]['name']} className="config-field" readOnly></input>

        <label htmlFor="type" className="config-label" >Type: </label>
        <input type="text" name="type" id="type" value={deviceList[count]['type']} className="config-field" readOnly></input>

        <label htmlFor="description" className="config-label" >Description: </label>
        <input type="text" name="description" id="description" placeholder="Enter device description" className="config-field"></input>

        <label htmlFor="active">Active</label>
        <input type="checkbox" name="active" id="active" className="config-field config-checked" defaultChecked />

        <button id="cancel" className="config-button config-cancel" onClick={handleCancel}>Cancel</button>

        <button id="next" className="config-button config-submit" onClick={handleNext} >Next</button>
        <button type="submit" id="create" className="config-button config-submit" onClick={handleNext} disabled>Save</button>
      </form>


    </div>
  )
}

export default DeviceConfig;