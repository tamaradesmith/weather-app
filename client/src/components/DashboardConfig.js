import React, { useState, useEffect } from "react";
import { Node, Device, Sensor, Controller, User } from '../js/requests';

import NodeConfigShow from './partials/NodeConfigShow'
import NodeConfig from "./partials/NodeConfig";
import DeviceConfig from './partials/DeviceConfig'

function DashboardConfig(props) {

  const [currentView, setCurrentView] = useState(null);

  // node States
  const [foundNodes, setFoundNodes] = useState([]); // nodes on network
  const [nodeId, setNodeId] = useState(1);
  const [nodes, setNodes] = useState([])

  async function getAllNodes() {
    const getNodes = await Node.getNodes()
    setNodes(getNodes)
    setCurrentView(<NodeConfigShow nodes={getNodes} findLocalNodes={findLocalNodes} getDeviceInfo={getDevicesOnNode} />)
  }

  async function findLocalNodes() {
    const nodes = await Node.searchForNodes();
    setFoundNodes(nodes);
    setCurrentView(<NodeConfig foundNodes={foundNodes} />)
  }

  async function getDevicesOnNode() {
    setCurrentView(<DeviceConfig nodeId={nodeId} createDevice={createDevice} createSensor={createSensor} createController={createController} redirect={redirectToShow} />)
  }

  function redirectToShow(id) {
    props.history.push(`/node/${id}`)
  }
  // async function createNode() {

  // }

  async function createDevice(info) {
    const result = await Device.create(info);
    return result
  }
  async function createSensor(info) {
    const result = await Sensor.create(info);
    return result
  }

  async function createController(info) {
    const result = await Controller.create(info);
    return result
  }

  function user() {
    console.log("meow")
     User.user()
  }

  useEffect(() => {
    getAllNodes()
  }, [])

  return (
    <main className="ConfigNodes config">
      <button onClick={user}> click </button>

      {currentView}

    </main>
  )
}
export default DashboardConfig