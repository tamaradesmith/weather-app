import React, { useState, useEffect, useReducer } from "react";
import { Node, Device } from "../../js/requests";


import NodeDetails from './NodeDetails';
import SensorDetails from './SensorDetails';
import ControllerDetails from './ControllerDetails';
import DeviceDetails from './DeviceDetails';
import PropertyDetails from './PropertyDetails';

function NodeShow(props) {
  const [node, setNode] = useState(null);
  const [devices, setDevices] = useState(null);
  const [updateNode, setUpdateNode] = useState(null)
  const [updateDevice, setUpdateDevice] = useState([]);
  const [updateSensor, setUpdateSensor] = useState([]);
  const [updateController, setUpdateController] = useState([]);
  const [updateProperty, setUpdateProperty] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const initialState = { view: '' }
  const [state, dispatch] = useReducer(reducer, initialState);

  function reducer(state, action) {
    switch (action.view) {
      case 'general':
        updateButtonClass('general');
        return { view: <NodeDetails node={node} activeUpdate={changeActive} /> };
      case 'devices':
        updateButtonClass('devices');
        return { view: <DeviceDetails devices={devices} activeUpdate={changeActive} /> };
      case 'sensors':
        updateButtonClass('sensors');
        return { view: <SensorDetails devices={devices} activeUpdate={changeActive} /> };
      case 'controllers':
        updateButtonClass('controllers');
        return { view: <ControllerDetails devices={devices} activeUpdate={changeActive} /> };
      case 'properties':
        updateButtonClass('properties');
        return { view: <PropertyDetails devices={devices} activeUpdate={changeActive} /> };
      default:
        throw new Error();
    }
  }

  function updateButtonClass(id) {
    document.querySelectorAll('.tab-button').forEach(button => {
      if (id === button.id) {
        button.classList.add("active-tab");
      } else {
        button.classList.remove('active-tab');
      };
    });
  };

  async function getNodeInfo() {
    const node = await Node.getNode(props.match.params.id);
    setNode(node);
    dispatch({ view: 'general' });
  }

  async function getDevicesByNodeId() {
    const allDevices = (node != null) ? await Device.getDeivcesByNodeId(node.id) : '';
    setDevices(allDevices);
  }

  function changeActive(type, id, active, deviceIndex, typeIndex) {
    const item = { type, id, active };
    switch (type) {
      case 'node':
        setUpdateNode(item);
        node.active = active;
        break;
      case 'device':
        const device = checkIfExistsInUpdate(item, updateDevice);
        setUpdateDevice(device);
        devices[deviceIndex].active = active;
        break;
      case 'sensor':
        const sensors = checkIfExistsInUpdate(item, updateSensor);
        devices[deviceIndex].sensors[typeIndex].active = active;
        setUpdateSensor(sensors)
        break;
      case 'controller':
        const controllers = checkIfExistsInUpdate(item, updateController);
        devices[deviceIndex].controllers[typeIndex].active = active;
        setUpdateController(controllers);
        break;
      case 'property':
        const properties = checkIfExistsInUpdate(item, updateProperty);
        devices[deviceIndex].properties[typeIndex].active = active;
        setUpdateProperty(properties);
        break;
      default:
        break;
    };
    setButtonDisabled(false);
  };

  async function handleUpdate() {
    const body = { nodes: updateNode, devices: updateDevice, sensors: updateSensor, controllers: updateController, properties: updateProperty };
    await Node.updateActiveStates(body);
    setUpdateNode(null);
    setUpdateDevice([]);
    setUpdateSensor([]);
    setUpdateController([]);
    setUpdateProperty([]);
    getNodeInfo();
  };

  function checkIfExistsInUpdate(newItem, existing) {
    let flag = 0;
    existing.forEach(item => {
      if (item.id === newItem.id) {
        item.active = newItem.active;
        flag = 1;
      };
    });
    if (flag === 0) {
      existing.push(newItem);
    };
    return existing;
  };

  useEffect(() => {
    getNodeInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    getDevicesByNodeId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node])

  if (node === null) {
    return "loading ...";
  };

  return (

    <main className="NodeShow  view">
      <h3 className="show-header" >Node: {node.name}</h3>
      <div className="tab-buttons">
        <button id="general" className="config-button tab-button active-tab" onClick={() => dispatch({ view: 'general' })}>General</button>
        <button id="devices" className="config-button tab-button" onClick={() => dispatch({ view: 'devices' })}>Devices</button>
        <button id="sensors" className="config-button tab-button" onClick={() => dispatch({ view: 'sensors' })}>Sensors</button>
        <button id="controllers" className="config-button tab-button" onClick={() => dispatch({ view: 'controllers' })} >Controllers</button>
        <button id="properties" className="config-button tab-button" onClick={() => dispatch({ view: 'properties' })} >Properties</button>
        <button id="save" className="config-button tab-button" disabled={buttonDisabled} onClick={handleUpdate}> Save</button>
      </div>

      {state.view}
    </main>

  );
};

export default NodeShow;