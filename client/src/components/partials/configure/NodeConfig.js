import React, { useState, useEffect, useReducer } from "react";
import { Node, Device, Site } from "../../../js/requests";

import { Redirect } from 'react-router-dom'

import DeviceConfig from './DeviceConfig';
import SensorConfig from './SensorConfig'
import ControllerConfig from "./ControllerConfig";
import PropertyConfig from "./PropertyConfig";

function NodeConfig(props) {

  const { foundNodes, cancel } = props

  const [sites, setSites] = useState([]);
  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState();

  const [nodeId, setNodeId] = useState();
  const [node, setNode] = useState('');

  const [deviceList, setDeviceList] = useState(null);
  const [device, setDevice] = useState('');
  const [configView, setConfigView] = useState("")

  const [deviceCount, setDeviceCount] = useState(0)
  const [sensorCount, setSensorCount] = useState(-1);
  const [controllerCount, setControllerCount] = useState(-1);
  const [propertyCount, setPropertyCount] = useState(-1);

  const initialState = { next: 'node' }
  const [next, dispatch] = useReducer(reducer, initialState);


  function handleCancel(event) {
    event.preventDefault();
    cancel();
  }

  async function getSites() {
    const result = await Site.getAllSites();
    setSites(result);
  };

  // Change modes
  function reducer(state, action) {
    switch (action.type) {
      case 'device':
        return { next: "device" };
      case 'sensor':
        return { next: "sensor" };
      case 'controller':
        return { next: "controller" };
      case 'property':
        return { next: "property" };
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
        return getControllerInfo();
      case 'property':
        return getPropertyInfo();
      default:
        break;
    }
  };

  // NODE CONFIGURE

  function handlePickNode(event) {
    const { target } = event;
    foundNodes.forEach((node, index) => {
      if (target.value === node.name) {
        document.querySelector('#nameNode').value = target.value;
        document.querySelector("#ipaddress").value = foundNodes[index].ip;
        document.querySelector("#description").value = foundNodes[index].description;
        document.querySelector("#type").value = foundNodes[index].type;
      };
    });
    document.querySelector('#site').classList.toggle('hidden');
    document.querySelector('#siteLabel').classList.toggle('hidden');
  };


  async function handlePickSite(event) {
    const { target } = event;
    document.querySelector('#siteName').value = sites[target.value].name;
    const result = await Site.getLocations(sites[target.value].id);
    setLocations(result);
    document.querySelector('#location').classList.toggle('hidden');
    document.querySelector('#locationLabel').classList.toggle('hidden');
  }

  function handlePickLocation(event) {
    const { target } = event;
    document.querySelector("#locationName").value = locations[target.value].name;
    setLocation(locations[target.value]);
    document.querySelector("#form").classList.remove("hidden");
    document.querySelector("#form").classList.add("config-form");
    document.querySelector("#next").disabled = false;

    document.querySelector('#location').classList.toggle('hidden');
    document.querySelector('#locationLabel').classList.toggle('hidden');
    document.querySelector('#site').classList.toggle('hidden');
    document.querySelector('#siteLabel').classList.toggle('hidden');
    document.querySelector('#name').classList.toggle('hidden');
    document.querySelector('#nameLabel').classList.toggle('hidden');
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
        case 'sensor':
          return sensorNext(info);
        case 'controller':
          return controllerNext(info);
        case 'property':
          return propertyNext(info);
        default:
          break;
      };
    };
  };

  function handleNodeShow() {
    props.redirect(nodeId, 'nodes');
  };

  function handleNo() {
    document.querySelector('#message').classList.add('hidden');
    document.querySelector("#message").classList.remove("message-div");
    document.querySelector('#form').classList.add('hidden');
    document.querySelector("#form").classList.remove("config-form");
    document.querySelector("#next").disabled = true;
  }

  async function getNode(id) {
    const deviceInfo = await Device.getDevicesFromNodeById(id);
    document.querySelector('#nodeForm').classList.add('hidden');
    document.querySelector("#nodeForm").classList.remove("config-form");
    setDeviceList(deviceInfo);
    // renderDevice();
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
      location_id: location.id,
      ipaddress: formData.get('ipAddress'),
      active: (formData.get(`active`) === "on") ? true : false
    };
    checkFields(newNode, inputs, nodeForm);
  };

  function getDeviceInfo() {
    const deviceForm = document.querySelector('#deviceForm');
    const inputs = deviceForm.querySelectorAll('input');
    const deviceInfo = deviceList[deviceCount];
    const formData = new FormData(deviceForm);
    const newDevice = {
      node_id: nodeId,
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
    const sensorInfo = deviceList[deviceCount].sensors[sensorCount];
    const formData = new FormData(sensorForm);
    const newSensor = {
      sensor: {
        device_id: device.id,
        name: sensorInfo.name,
        url: sensorInfo.url,
        description: formData.get('description'),
        active: (formData.get(`active`) === "on") ? true : false,
      },
      properties: {
        min: sensorInfo.min,
        max: sensorInfo.max,
        unit: formData.get('unit'),
      },
      type: sensorInfo.type,
    }
    checkFields(newSensor, inputs, sensorForm)
  }

  function getControllerInfo() {
    const controllerForm = document.querySelector('#controllerForm');
    const inputs = controllerForm.querySelectorAll('input');
    const controllerInfo = deviceList[deviceCount].controllers[controllerCount];
    const formData = new FormData(controllerForm);
    const newController = {
      controller: {
        device_id: device.id,
        url: controllerInfo.url,
        name: controllerInfo.name,
        description: formData.get("description"),
        active: (formData.get(`active`) === "on") ? true : false,
      },
      type: controllerInfo.type,
    };
    checkFields(newController, inputs, controllerForm)
  }

  function getPropertyInfo() {
    const propertyForm = document.querySelector('#propertyForm');
    const inputs = propertyForm.querySelectorAll('input');
    const propertyInfo = deviceList[deviceCount].properties[propertyCount];
    const formData = new FormData(propertyForm);
    const newProperty = {
      properties: {
        device_id: device.id,
        name: propertyInfo.name,
        url: propertyInfo.url,
        description: formData.get("description"),
        active: (formData.get(`active`) === "on") ? true : false,

      },
      type: propertyInfo.type,
      property_properties: {
        members: (propertyInfo.members) ? propertyInfo.members : "none",
        min: (propertyInfo.min) ? propertyInfo.min : "none",
        max: (propertyInfo.max) ? propertyInfo.max : "none",
        unit: (propertyInfo.unit) ? formData.get('unit') : "none",
      }
    };
    checkFields(newProperty, inputs, propertyForm)
  }
  // Render Views

  function renderDevice() {
    if (deviceList.length > 0 && deviceCount <= deviceList.length) {
      dispatch({ type: 'device' });
      setConfigView(<DeviceConfig deviceList={deviceList} node={node} count={deviceCount} />);
    };
  };

  function renderSensor() {
    if (deviceList[deviceCount].sensors.length === 0) {
      setSensorCount(-1);
      setControllerCount(0);
    } else {
      dispatch({ type: "sensor" });
      setConfigView(<SensorConfig device={device} node={node} sensorList={deviceList[deviceCount].sensors} sensorCount={sensorCount} />);
    };
  };

  function renderControllers() {
    if (deviceList[deviceCount].controllers.length === 0) {
      setControllerCount(-1);
      setPropertyCount(0);
    } else {
      dispatch({ type: "controller" });
      setConfigView(<ControllerConfig device={device} node={node} controllerList={deviceList[deviceCount].controllers} controllerCount={controllerCount} />);
    };
  };

  function renderProperties() {
    if (deviceList[deviceCount].properties.length === 0) {
      setPropertyCount(-1);
      nextDevice();
    } else {
      dispatch({ type: "property" });
      setConfigView(<PropertyConfig device={device} node={node} propertyList={deviceList[deviceCount].properties} propertyCount={propertyCount} />);
    };
  };
  // Create Functions

  async function createNode(info) {
    const nodeDB = await props.createNode(info);
    setNodeId(await nodeDB.id);
    const nodeInfo = await Node.getNode(nodeDB.id);
    setNode(nodeInfo);
    if (nodeDB.value === true) {
      document.querySelector('#message').classList.remove('hidden');
      document.querySelector("#message").classList.add("message-div");
    } else {
      getNode(nodeDB.id);
    };
  };

  async function createDevice(info) {
    const deviceDb = await props.createDevice(info);
    if (typeof (parseFloat(deviceDb.id)) === "number") {
      setDevice(await deviceDb);
      setSensorCount(0);
    } else {
      console.error("error :", deviceCount);
    };
  };


  // Next functions

  function nextDevice() {
    if (deviceCount + 1 >= deviceList.length) {
      props.redirect(node.id);
    } else {
      setDeviceCount(deviceCount + 1)
    };
  };

  async function sensorNext(sensor) {
    await props.createSensor(sensor);
    if (parseInt(sensorCount) + 1 < deviceList[deviceCount].sensors.length) {
      setSensorCount(sensorCount + 1)
    } else {
      setSensorCount(-1);
      setControllerCount(0);
    }
  };

  async function controllerNext(controller) {
    await props.createController(controller);
    if (controllerCount + 1 < deviceList[deviceCount].controllers.length) {
      setControllerCount(controllerCount + 1)
    } else {
      setControllerCount(-1);
      setPropertyCount(0);
    };
  };

  async function propertyNext(property) {
    await props.createProperty(property);
    if (propertyCount + 1 < deviceList[deviceCount].properties.length) {
      setPropertyCount(propertyCount + 1);
    } else {
      nextDevice();
      setPropertyCount(-1);
    }
  };

  useEffect(() => {
    if (sensorCount > -1 &&
      device !== undefined) {
      renderSensor();
    } else {
      setSensorCount(sensorCount);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sensorCount]);

  useEffect(() => {
    if (controllerCount > -1 &&
      device !== undefined) {
      renderControllers();
    } else {
      setControllerCount(controllerCount);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controllerCount]);

  useEffect(() => {
    if (propertyCount > -1 &&
      device !== undefined) {
      renderProperties();
    } else {
      setPropertyCount(propertyCount);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propertyCount]);

  useEffect(() => {
    if (deviceList !== null) {
      renderDevice()
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deviceList]);


  useEffect(() => {
    if (deviceList !== null) {
      renderDevice();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deviceCount]);

  useEffect(() => {
    getSites();
  }, ([]));


  // if (foundNodes === null) {
  //   return "Searching..."
  // };
  if (props.admin) {

  return (
    <div className="NodeConfig config-body" >

      <div className="config-main">

        <form id="nodeForm" className="config-form" >
          <h3 className="config-header">Node Configure</h3>

          <label htmlFor="name" id="nameLabel"> Name: </label>
          <select name="name" id='name' className="config-field config-select" onChange={handlePickNode}>
            <option value=""></option>
            {foundNodes.map((node, index) => (
              <option key={index} name={node.name} value={node.name}>{node.name}</option>
            ))}
          </select>



          <label htmlFor="site" id="siteLabel" className="hidden"> Site: </label>
          <select name="site" id="site" className="hidden config-field config-select" onChange={handlePickSite}>
            <option value=""></option>
            {sites.map((site, index) => (
              <option key={site.id} value={index}> {site.name} </option>
            ))}
          </select>

          <label htmlFor="location" id="locationLabel" className="hidden"> Location: </label>
          <select name="location" id="location" className="hidden config-field config-select" onChange={handlePickLocation}>
            <option value=""></option>
            {locations.map((location, index) => (
              <option key={location.id} value={index}> {location.name} </option>
            ))}
          </select>

          <div id="form" className="hidden form-column">

            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="nameNode" className="config-field" readOnly></input>

            <label htmlFor="siteName">Site</label>
            <input type="text" name="siteName" id="siteName" className="config-field" readOnly></input>

            <label htmlFor="locationName">Location</label>
            <input type="text" name="locationName" id="locationName" className="config-field" readOnly></input>

            <label htmlFor="description">Description</label>
            <input type="text" name="description" id="description" className="config-field" readOnly></input>

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

        {deviceList !== null ? (
          <p>{deviceCount + 1} / {deviceList.length}</p>
        ) : (null)}
        <button id="cancel" className="config-button config-cancel" onClick={handleCancel}>Cancel</button>
        <button id="next" className="config-button config-next" onClick={handleNext}  >Next</button>

      </div>

    </div>
  )
  } else {
    return <Redirect to='/nodes' />
  }
}
export default NodeConfig;