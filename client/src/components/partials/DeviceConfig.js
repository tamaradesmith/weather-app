import React, { useState, useEffect } from "react";
import { Node, Device } from "../../js/requests"
import SensorConfig from './SensorConfig'

function DeviceConfig(props) {

  // const fields = ["name", 'decription', 'type'];
  const { nodeId } = props;

  const [node, setNode] = useState('');
  const [deviceList, setDeviceList] = useState([]);
  const [count, setCount] = useState(0);
  const [device, setDevice] = useState([]);
  const [sensor, setSensor] = useState([]);
  const [senosrView, setSensorView] = useState([])
  const [sensorCount, setSensorCount] = useState(0);

  async function getNode() {
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
    getDeviceInfo();
  };

  function getDeviceInfo() {
    const deviceForm = document.querySelector('#deviceForm');
    const inputs = deviceForm.querySelectorAll('input');
    const device = deviceList[count];
    const formData = new FormData(deviceForm);
    const newDevice = {
      node_id: node.id,
      name: device.name,
      type: device.type,
      description: formData.get("description"),
      active: (formData.get(`active`) === "on") ? true : false,
    };
    checkFields(newDevice, inputs)
  }

  async function checkFields(deviceInfo, inputs) {
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
      const deviceDb = await props.createDevice(deviceInfo);
      setDevice(deviceDb);
      document.querySelector('#description').value = '';
      document.querySelector('#deviceDiv').classList.add("hidden")
      setSensorView(<SensorConfig device={deviceDb} node={node} sensorList={deviceList[count].sensors} sensorCount={sensorCount} />)
      // setCount(count + 1);
    }
  }


  useEffect(() => {
    getNode();
  }, [])

  if (deviceList.length === 0) {
    return "loading"
  }

  return (
    <div className="DeviceConfig ">
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

          <button id="cancel" className="config-button config-cancel" onClick={handleCancel}>Cancel</button>

          <button id="next" className="config-button config-submit" onClick={handleNext} >Next</button>
          <button type="submit" id="create" className="config-button config-submit" onClick={handleNext} disabled>Save</button>
        </form>

        <p>{count + 1} / {deviceList.length}</p>
      </div>
      {senosrView}
    </div>
  )
}

export default DeviceConfig;