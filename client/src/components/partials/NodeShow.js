import React, { useState, useEffect, useReducer } from "react";
import { Node, Device,  Controller } from "../../js/requests";


import NodeDetails from './NodeDetails'
import SensorDetails from './SensorDetails';
import ControllerDetails from './ControllerDetails'
import DeviceDetails from './DeviceDetails'

function NodeShow(props) {
  console.log("NodeShow -> props", props.match.params.id)
  const [node, setNode] = useState(null);
  const [devices, setDevices] = useState(null)

  const [labels, setLabel] = useState([]);
  // const [view, setView] = useState('')
  const initialState = { view: '' }

  const [state, dispatch] = useReducer(reducer, initialState)
  // const omitList = ['id', 'createdAt', 'active'];


  function reducer(state, action) {
    switch (action.view) {
      case 'general':
        return { view: <NodeDetails node={node} /> }
      case 'devices':
        return { view: <DeviceDetails devices={devices}  /> }
      case 'sensors':
        return { view: <SensorDetails /> }
      case 'controllers':
        return { view: <ControllerDetails /> }
      default:
        throw new Error();

    }
  }

  async function getNodeInfo() {
    const node = await Node.getNode(props.match.params.id)
    setLabel(Object.keys(node))
    setNode(node);
    dispatch({ view: 'general' })
  }

  async function getDevicesByNodeId() {
    const allDevices = (node != null) ? await Device.getDeivcesByNodeId(node.id): '';
    console.log("getDevicesByNodeId -> allDevices", allDevices)
    setDevices(allDevices)
  }
  
  useEffect(() => {
    getNodeInfo();
  }, [])

  useEffect(() => {
    getDevicesByNodeId()
  }, [node])
  
  if (node === null) {
    return "loading ..."
  }

  return (

    <main className="NodeShow  view">
      <h3 className="show-header" >Node: {node.name}</h3>
      <div className="tab-buttons">
        <button id="general" className="config-button tab-button active-tab" onClick={() => dispatch({ view: 'general' })}>General</button>
        <button id="device" className="config-button tab-button" onClick={() => dispatch({ view: 'devices' })}>Devices</button>

        <button id="sensors" className="config-button tab-button" onClick={() => dispatch({ view: 'sensors' })}>Sensors</button>
        <button id="controllers" className="config-button tab-button" onClick={() => dispatch({ view: 'controllers' })} >Controllers</button>
      </div>
      {state.view}
    </main>

  )
}

export default NodeShow;