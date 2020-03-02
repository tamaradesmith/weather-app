import React, { useState, useEffect } from "react";
import { Node, Device } from '../js/requests';

import NodeConfigShow from './partials/NodeConfigShow'
import NodeConfig from "./partials/NodeConfig";
import DeviceConfig from './partials/DeviceConfig'

function DashboardConfig(props) {

  const [currentView, setCurrentView] = useState(null);

  // node States
  const [foundNodes, setFoundNodes] = useState([]); // nodes on network
  const [nodeId, setNodeId] = useState(1);


  async function getAllNodes() {
    const nodes = await Node.getNodes()
    setCurrentView(<NodeConfigShow nodes={nodes} findLocalNodes={findLocalNodes} getDeviceInfo={getDevicesOnNode} />)
  }

  async function findLocalNodes() {
    const nodes = await Node.searchForNodes();
    setFoundNodes(nodes);
    setCurrentView(<NodeConfig foundNodes={foundNodes} />)
  }

  async function getDevicesOnNode() {
    setCurrentView(<DeviceConfig nodeId={nodeId} createDevice={createDevice} />)
  }

  // async function createNode() {

  // }

  async function createDevice(info) {
    const result = await Device.create(info);
    return result
  }

  useEffect(() => {
    getAllNodes()
  }, [])

  return (
    <main className="ConfigNodes config">

      {currentView}

    </main>
  )
}
export default DashboardConfig