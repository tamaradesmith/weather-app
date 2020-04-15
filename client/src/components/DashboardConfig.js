import React, { useState, useEffect } from "react";
import { Node, Device, Sensor, Controller, User } from '../js/requests';

import NodeIndex from './partials/NodeIndex'
import NodeConfig from "./partials/NodeConfig";
import Spinner from './partials/Spinner';

function DashboardConfig(props) {

  const [currentView, setCurrentView] = useState(null);

  // node States
  const [foundLocalNodes, setFoundLocalNodes] = useState([]); // nodes on network
  // const [nodes, setNodes] = useState([]);   // node in DB;

  async function getAllNodes() {
    const getNodes = await Node.getNodes()
    // setNodes( getNodes);
    setCurrentView(<NodeIndex nodes={getNodes} findLocalNodes={findLocalNodes}   />)
  }

  async function findLocalNodes() {
    setCurrentView(<Spinner />)
    const nodes = await Node.searchForNodes();
    setFoundLocalNodes( await nodes);
    setCurrentView(<NodeConfig createNode={createNode} createDevice={createDevice} createSensor={createSensor} createController={createController} foundNodes={foundLocalNodes} redirect={redirectToShow} cancel={handleCancel} />)
  }

  function redirectToShow(id) {
    props.history.push(`/node/${id}`)
  };

  function handleCancel() {
    getAllNodes();
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

    </main>
  )
}
export default DashboardConfig