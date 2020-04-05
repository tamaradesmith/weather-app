import React, { useState, useEffect } from "react";
import { Node, Device, Sensor, Controller, User } from '../js/requests';

import NodeIndex from './partials/NodeIndex'
import NodeConfig from "./partials/NodeConfig";
import DeviceConfig from './partials/DeviceConfig';
import Spinner from './partials/Spinner';

function DashboardConfig(props) {

  const [currentView, setCurrentView] = useState(null);

  // node States
  const [foundNodes, setFoundNodes] = useState(null); // nodes on network
  const [nodeId, setNodeId] = useState(1);
  const [nodes, setNodes] = useState([])

  async function getAllNodes() {
    const getNodes = await Node.getNodes()
    setNodes(getNodes)
    setCurrentView(<NodeIndex nodes={getNodes} findLocalNodes={findLocalNodes} getDeviceInfo={getDevicesOnNode} cancel={handleCancel} />)
  }

  async function findLocalNodes() {
    setCurrentView(<Spinner />)
    const nodes = await Node.searchForNodes();
    setFoundNodes(nodes);
    setCurrentView(<NodeConfig createNode={createNode} foundNodes={nodes} redirect={redirectToShow} />)
  }



  async function getDevicesOnNode() {
    setCurrentView(<DeviceConfig nodeId={nodeId} createDevice={createDevice} createSensor={createSensor} createController={createController} redirect={redirectToShow} />)
  }

  function redirectToShow(id) {
    props.history.push(`/node/${id}`)
  };

  function handleCancel(){
    setCurrentView(<NodeIndex nodes={nodes} findLocalNodes={findLocalNodes} getDeviceInfo={getDevicesOnNode} />)
  }

  async function createNode(info) {
   const result = await Node.create(info);
   return result;
  }

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

      {currentView}
 
      {/* <NodeConfig createNode={createNode} cancel={handleCancel} redirect={redirectToShow} foundNodes={[{
        ip: '192.168.1.66',
        name: 'j400t',
        description: 'Q400 Jig',
        location: 'Tammy',
        type: 'qWiFi400'
      },
      {
        ip: '192.168.1.70',
        name: 'village',
        description: 'Trees In Village',
        location: "Tammy's Apt",
        type: 'Core Stub'
      }]
} /> */}

    </main>
  )
}
export default DashboardConfig