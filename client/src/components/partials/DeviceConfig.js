import React, { useState, useEffect } from "react";
import { Node, Device } from "../../js/requests"
import SensorConfig from './SensorConfig'

function DeviceConfig(props) {

  const { nodeId } = props;

  const [node, setNode] = useState('');
  const [deviceList, setDeviceList] = useState(null);
  const [count, setCount] = useState(0);
  const [device, setDevice] = useState('');
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

  async function sensorNext(sensor){
   const newSensor = props.createSensor(sensor);
   (sensorCount + 1  < deviceList[count].sensors.length) ?  setSensorCount(sensorCount + 1) : nextDevice();
   return sensorCount;
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
      renderSensor(deviceDb);
    }
  }
 
  function nextDevice(){
    document.querySelector('#deviceDiv').classList.remove("hidden")

    setSensorView([]);
    setSensorCount(0);
    setCount(count + 1);

    console.log(count)
  }
  function renderSensor(device){
    setSensorView(<SensorConfig device={device} node={node} sensorList={deviceList[count].sensors} sensorCount={sensorCount} handleNext={sensorNext} cancel={handleCancel} />)
  }

  useEffect(() => {
    getNode();
  }, [])

  useEffect(()=>{
    if ( sensorCount !== 0){
      setSensorView(<SensorConfig device={device} node={node} sensorList={deviceList[count].sensors} sensorCount={sensorCount} handleNext={sensorNext} cancel={handleCancel} />)
    }
    },[sensorCount])

    // useEffect(()=>{

    // },[count])

  if (deviceList === null) {
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