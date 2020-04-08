import React, { useState, useEffect, useReducer } from "react";
import { Node, Device } from "../../js/requests";

import DeviceConfig from './DeviceConfig';
import SensorConfig from './SensorConfig'
import ControllerConfig from "./ControllerConfig";
import { render } from "react-dom";

function NodeConfig(props) {

  const { foundNodes, cancel } = props

  const [nodeId, setNodeId] = useState(null);
  const [node, setNode] = useState('');
  const [deviceList, setDeviceList] = useState(null);
  const [count, setCount] = useState(0);
  const [device, setDevice] = useState('');
  const [configView, setConfigView] = useState("")

  const [deviceCount, setDeviceCount] = useState(0)
  const [sensorCount, setSensorCount] = useState(0);
  const [controllerCount, setControllerCount] = useState(0);

  const initialState = { next: 'node' }
  const [next, dispatch] = useReducer(reducer, initialState);


  function handleCancel(event) {
    event.preventDefault();
    cancel();
  }

  // Change modes
  function reducer(state, action) {
    switch (action.type) {
      case 'device':
        return { next: "device" };
      case 'sensor':
        return { next: "sensor" };
      case 'controller':
        return { next: "controller" }
      default:
        throw new Error();
    }
  }

  // Handle Next 
  function handleNext(event) {
    event.preventDefault();
    switch (next.next) {
      case 'node':
        return getNodeInfo();
      case 'device':
        return getDeviceInfo();
      case 'sensor':
        return getSensorInfo();
      case 'controller':
        return getControllerInfo()
    }
  };

  function handlePickNode(event) {
    const { target } = event;
    foundNodes.forEach((node, index) => {
      if (target.value === node.name) {
        document.querySelector("#ipaddress").value = foundNodes[index].ip;
        document.querySelector("#location").value = foundNodes[index].location;
        document.querySelector("#description").value = foundNodes[index].description;
        document.querySelector("#type").value = foundNodes[index].type;
      }
    })
    document.querySelector("#form").classList.remove("hidden");
    document.querySelector("#form").classList.add("config-form");
    document.querySelector("#next").disabled = false;
  }



  async function checkFields(info, inputs, target) {
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
      target.reset();
      switch (next.next) {
        case 'node':
          return createNode(info);
        case 'device':
          return createDevice(info);
        // case 'sensor':
        //   return sensorNext(info);
        // case 'controller':
        //   return controllerNext(info);
      }
    }
  }

  function handleNodeShow() {
    props.redirect(nodeId, 'nodes');
  }

  function handleNo() {
    document.querySelector('#message').classList.add('hidden');
    document.querySelector("#message").classList.remove("message-div");
    document.querySelector('#form').classList.add('hidden');
    document.querySelector("#form").classList.remove("config-form");
    document.querySelector("#next").disabled = true;
  }

  async function getNode(nodeId) {
    const deviceInfo = await Device.getDevicesFromNodeById(nodeId);
    console.log("getNode -> deviceInfo", deviceInfo)
    document.querySelector('#nodeForm').classList.add('hidden');
    document.querySelector("#nodeForm").classList.remove("config-form");
    setDeviceList(deviceInfo);
    setNode(node);
    renderDevice();
  };

  // get Info from Forms

  function getNodeInfo() {
    const nodeForm = document.querySelector('#nodeForm');
    const inputs = nodeForm.querySelectorAll('input');
    const formData = new FormData(nodeForm);
    const newNode = {
      name: formData.get("name"),
      description: formData.get("description"),
      type: formData.get('type'),
      location: (formData.get('location') !== "other") ? formData.get('location') : formData.get("locationOther"),
      site: formData.get('site'),
      ipaddress: formData.get('ipAddress'),
      active: (formData.get(`active`) === "on") ? true : false
    };
    checkFields(newNode, inputs, nodeForm);
  };

  function getDeviceInfo() {
    const deviceForm = document.querySelector('#deviceForm');
    const inputs = deviceForm.querySelectorAll('input');
    const deviceInfo = deviceList[count];
    const formData = new FormData(deviceForm);
    const newDevice = {
      node_id: node.id,
      name: deviceInfo.name,
      type: deviceInfo.type,
      description: formData.get("description"),
      active: (formData.get(`active`) === "on") ? true : false,
    };
    checkFields(newDevice, inputs, deviceForm)
  }

  function getSensorInfo() {
    const sensorForm = document.querySelector("#sensorForm");
    const inputs = sensorForm.querySelectorAll('input');
    const sensorInfo = deviceList[count].sensors[sensorCount];
    const formData = new FormData(sensorForm);
    const newSensor = {
      device_id: device.id,
      name: sensorInfo.name,
      type: sensorInfo.type,
      location: node.location,
      description: formData.get('description'),
      min: sensorInfo.min,
      max: sensorInfo.max,
      unit: formData.get('unit'),
      active: (formData.get(`active`) === "on") ? true : false,
    }
    checkFields(newSensor, inputs, sensorForm)
  }

  function getControllerInfo() {
    const controllerForm = document.querySelector('#controllerForm');
    const inputs = controllerForm.querySelectorAll('input');
    const controllerInfo = deviceList[count].controllers[controllerCount];
    const formData = new FormData(controllerForm);
    const newcontroller = {
      device_id: device.id,
      location: node.location,
      name: controllerInfo.name,
      type: controllerInfo.type,
      description: formData.get("description"),
      active: (formData.get(`active`) === "on") ? true : false,
    };
    checkFields(newcontroller, inputs, controllerForm)
  }

  // Render Views

  function renderDevice() {
    console.log('renderDevice')
    if (node != '') {
      dispatch({ type: 'device' });
      setConfigView(<DeviceConfig deviceList={deviceList} node={node} count={deviceCount} />)
    }
  };

  async function createNode(info) {
    const nodeDB = await props.createNode(info);
    if (nodeDB.value === true) {
      document.querySelector('#message').classList.remove('hidden');
      document.querySelector("#message").classList.add("message-div");
      setNodeId(nodeDB.id)
    } else {
      getNode(nodeDB);
    }
  };

  async function createDevice(info) {
    const deviceDb = await props.createDevice(info);
    setDevice(deviceDb);
    document.querySelector('#deviceDiv').classList.add("hidden")
    // renderSensor(deviceDb);
  }





  if (foundNodes === null) {
    return "Searching..."
  }


  return (
    <div className="NodeConfig config-body" >

      <div className="config-main">

        <form id="nodeForm" className="config-form" >
          <h3 className="config-header">Node Configure</h3>

          <label htmlFor="name"> Name: </label>
          <select name="name" id='name' className="config-field config-select" onChange={handlePickNode}>
            <option value=""></option>
            {foundNodes.map((node, index) => (
              <option key={index} name={node.name} value={node.name}>{node.name}</option>
            ))}
          </select>

          <div id="form" className="hidden form-column">

            <label htmlFor="description">Description</label>
            <input type="text" name="description" id="description" className="config-field" readOnly></input>

            <label htmlFor="location">Location</label>
            <input name="location" id="location" className="config-field" readOnly >
            </input>

            <label htmlFor="site">Site</label>
            <input name="site" id="location" className="config-field"  >
            </input>

            <label htmlFor="type">Type</label>
            <input type="text" name="type" id="type" placeholder="Enter node type" className="config-field" readOnly></input>

            <label htmlFor="ipAddress">IP Address</label>
            <input type="text" name="ipAddress" id="ipaddress" className="config-field" readOnly></input>

            <label htmlFor="active">Active</label>
            <input type="checkbox" name="active" id="active" className="config-field config-checked" defaultChecked />

          </div>
        </form>

        {configView}


        <div id='message' className="hidden">

          <p className="message-text">Node already Exist, redirct to node page?</p>
          <button id="yes" className="config-button message-button2" onClick={handleNodeShow} >Yes</button>
          <button id="no" className="config-button message-button1" onClick={handleNo} >No</button>
        </div>
      </div>

      <div className="config-deivce-bottom">

        {/* <p>{count + 1} / {deviceList.length}</p> */}
        <button id="cancel" className="config-button config-cancel" onClick={handleCancel}>Cancel</button>
        <button id="next" className="config-button config-next" onClick={handleNext}  >Next</button>

      </div>
    </div>
  )
}
export default NodeConfig;