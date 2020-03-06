import React, { useState, useEffect, useReducer } from "react";
import { Redirect } from 'react-router-dom';

import { Node, Device } from "../../js/requests"
import SensorConfig from './SensorConfig'
import ControllerConfig from "./ControllerConfig";

function DeviceConfig(props) {

  const { nodeId } = props;
  const [node, setNode] = useState('');
  const [deviceList, setDeviceList] = useState(null);
  const [count, setCount] = useState(0);
  const [device, setDevice] = useState('');
  const [configView, setConfigView] = useState([])
  const [sensorCount, setSensorCount] = useState(0);
  const [controllerCount, setControllerCount] = useState(0);

  const initialState = { next: 'device' }
  const [next, dispatch] = useReducer(reducer, initialState);



  async function getNode() {
    const node = await Node.getNode(nodeId);
    const deviceInfo = await Device.getDevicesFromNodeById(nodeId)
    setDeviceList(deviceInfo);
    setNode(node);
  };

  function handleCancel(event) {
    event.preventDefault();
    props.history.push(`/DashboardConfig`);
  }

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

  function handleNext(event) {
    event.preventDefault();
    switch (next.next) {
      case 'device':
        return getDeviceInfo();
      case 'sensor':
        return getSensorInfo();
      case 'controller':
        return getControllerInfo()
    }
  };

  async function sensorNext(sensor) {
    const newSensor = props.createSensor(sensor);
    (sensorCount + 1 < deviceList[count].sensors.length) ? setSensorCount(sensorCount + 1) : renderControllers();
    return sensorCount;
  }
  async function controllerNext(controller) {
    const newController = await props.createController(controller);
    (controllerCount + 1 < deviceList[count].controllers.length) ? setControllerCount(controllerCount + 1) : nextDevice()
    return newController;
  }

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
      target.reset()
      switch (next.next) {
        case 'device':
          return createDevice(info)
        case 'sensor':
          return sensorNext(info)
        case 'controller':
          return controllerNext(info);
      }
    }
  }

  async function createDevice(info) {
    const deviceDb = await props.createDevice(info);
    setDevice(deviceDb);
    document.querySelector('#deviceDiv').classList.add("hidden")
    renderSensor(deviceDb);
  }

  function nextDevice() {
    if (count + 1 >= deviceList.length) {
      props.redirect(node.id);
    } else {
      document.querySelector('#deviceDiv').classList.remove("hidden")
      setConfigView([]);
      dispatch({ type: "device" })
      setSensorCount(0);
      setControllerCount(0);
      setCount(count + 1);
    }
  }

  function renderSensor(device) {
    if (deviceList[count].sensors.length === 0) {
      renderControllers();
    } else {
      dispatch({ type: "sensor" })
      setConfigView(<SensorConfig device={device} node={node} sensorList={deviceList[count].sensors} sensorCount={sensorCount} />);
    }
  }

  function renderControllers() {
    if (deviceList[count].controllers.length === 0) {
      nextDevice()
    } else {
      dispatch({ type: "controller" })
      setConfigView(<ControllerConfig device={device} node={node} controllerList={deviceList[count].controllers} controllerCount={controllerCount} />);
    };
  };

  useEffect(() => {
    getNode();
  }, []);

  useEffect(() => {
    if (sensorCount !== 0) {
      setConfigView(<SensorConfig device={device} node={node} sensorList={deviceList[count].sensors} sensorCount={sensorCount} handleNext={sensorNext} cancel={handleCancel} />)
    }
  }, [sensorCount])


  if (deviceList === null) {
    return "loading"
  }


  return (
    <div className="DeviceConfig config-body ">
      <div id="deviceDiv">
        <form id="deviceForm" className="config-form">
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

        </form>
      </div>

      {configView}

      <div className="config-deivce-bottom">

        <p>{count + 1} / {deviceList.length}</p>
        <button id="cancel" className="config-button config-cancel" onClick={handleCancel}>Cancel</button>
        <button id="next" className="config-button config-next" onClick={handleNext} >Next</button>

      </div>
    </div>
  )
}

export default DeviceConfig;