import React, { useState, useEffect } from "react";
import { Node, Device } from '../js/requests';
import { NavLink } from "react-router-dom"

import NodeConfigShow from './partials/NodeConfigShow'
import NodeConfig from "./partials/NodeConfig";
import DeviceConfig from './partials/DeviceConfig'

function DashboardConfig(props) {

  const [currentView, setCurrentView] = useState(null);
  const [nodes, setNodes] = useState([]); // nodes in db

  // // node States
  const [foundNodes, setFoundNodes] = useState([]); // nodes on network
  const [nodeId, setNodeId] = useState(null);

  async function getAllNodes() {
    const nodes = await Node.getNodes()
   setNodes(nodes)
   setCurrentView(<NodeConfigShow nodes={nodes} findLocalNodes={findLocalNodes} getDeviceInfo={getDevicesOnNode} />)
  }
  
  async function findLocalNodes() {
    const nodes = await Node.searchForNodes();
    setFoundNodes(nodes);
    setCurrentView(<NodeConfig foundNodes={foundNodes} />)
  }
  
  async function getDevicesOnNode(nodeId){
  setCurrentView(<DeviceConfig />)
  }

  async function createNode() {

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