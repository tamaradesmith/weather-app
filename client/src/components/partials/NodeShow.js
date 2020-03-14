import React, { useState, useEffect, useReducer } from "react";
import { Node, Device, Controller, Sensor } from "../../js/requests";


import NodeDetails from './NodeDetails'
import SensorDetails from './SensorDetails';
import ControllerDetails from './ControllerDetails'
import DeviceDetails from './DeviceDetails'

function NodeShow(props) {
  const [node, setNode] = useState(null);
  const [devices, setDevices] = useState(null);

  const initialState = { view: '' }
  const [state, dispatch] = useReducer(reducer, initialState)

  function reducer(state, action) {
    switch (action.view) {
      case 'general':
        updateButtonClass('general')
        return { view: <NodeDetails node={node} /> }
      case 'devices':
        updateButtonClass('devices')
        return { view: <DeviceDetails devices={devices} /> }
      case 'sensors':
        updateButtonClass('sensors')
        return { view: <SensorDetails devices={devices} /> }
      case 'controllers':
        updateButtonClass('controllers')
        return { view: <ControllerDetails devices={devices} /> }
      default:
        throw new Error();
    }
  }

  function updateButtonClass(id) {
    document.querySelectorAll('.tab-button').forEach(button => {
      if (id === button.id) {
        button.classList.add("active-tab")
      } else {
        button.classList.remove('active-tab')
      }
    })
  }

  async function getNodeInfo() {
    const node = await Node.getNode(props.match.params.id)
    setNode(node);
    dispatch({ view: 'general' })
  }

  async function getDevicesByNodeId() {
    const allDevices = (node != null) ? await Device.getDeivcesByNodeId(node.id) : '';
    setDevices(allDevices)
  }
  useEffect(() => {
    getNodeInfo();
  }, [])

  useEffect(() => {
    getDevicesByNodeId();
  }, [node])

  if (node === null) {
    return "loading ..."
  }

  return (

    <main className="NodeShow  view">
      <h3 className="show-header" >Node: {node.name}</h3>
      <div className="tab-buttons">
        <button id="general" className="config-button tab-button active-tab" onClick={() => dispatch({ view: 'general' })}>General</button>
        <button id="devices" className="config-button tab-button" onClick={() => dispatch({ view: 'devices' })}>Devices</button>

        <button id="sensors" className="config-button tab-button" onClick={() => dispatch({ view: 'sensors' })}>Sensors</button>
        <button id="controllers" className="config-button tab-button" onClick={() => dispatch({ view: 'controllers' })} >Controllers</button>
      </div>
      {state.view}
    </main>

  )
}

export default NodeShow;