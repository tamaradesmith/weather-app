import React, { useState, useEffect } from "react";
import { Node, Device, Sensor, Controller, User } from '../js/requests';

import NodeIndex from './partials/NodeIndex'
import NodeConfig from "./partials/NodeConfig";
import Spinner from './partials/Spinner';

function DashboardConfig(props) {

  const [currentView, setCurrentView] = useState(null);

  async function getAllNodes() {
    const getNodes = await Node.getNodes()
    setCurrentView(<NodeIndex nodes={getNodes} findLocalNodes={findLocalNodes} />)
  }


  async function findLocalNodes() {
    setCurrentView(<Spinner />);
    document.querySelector('#message').classList.add('hidden');
    document.querySelector("#message").classList.remove("message-div");
    const nodes = await Node.searchForNodes();
    if (nodes.length === 0) {
      document.querySelector('#message').classList.remove('hidden');
      document.querySelector("#message").classList.add("message-div");
      setCurrentView(<NodeIndex nodes={nodes} findLocalNodes={findLocalNodes} />);
    } else {
      setCurrentView(<NodeConfig createNode={createNode} createDevice={createDevice} createSensor={createSensor} createController={createController} foundNodes={nodes} redirect={redirectToShow} cancel={handleCancel} />);
    };
  };

  function redirectToShow(id) {
    setCurrentView(null);
    props.history.push(`/node/${id}`);
  };

  function handleCancel() {
    getAllNodes();
    document.querySelector('#message').classList.add('hidden');
    document.querySelector("#message").classList.remove("message-div");
  };

  async function createNode(info) {
    const result = await Node.create(info);
    return result;
  };

  async function createDevice(info) {
    const result = await Device.create(info);
    return result;
  };

  async function createSensor(info) {
    const result = await Sensor.create(info);
    return result;
  };

  async function createController(info) {
    const result = await Controller.create(info);
    return result;
  };


  function user() {
    console.log("meow");
    User.user();
  };

  // useEffect(() => {
  //   renderNode();
  // }, [foundLocalNodes])

  useEffect(() => {
    getAllNodes()
  }, [])


  return (
    <main className="ConfigNodes config">

      {currentView}

      <div id='message' className="hidden">
        <p> No nodes located</p>
        <button className="config-button message-button2" onClick={findLocalNodes}> Search </button>
        <button className="config-button message-button1" onClick={handleCancel}> Cancel</button>
      </div>

    </main>
  )
}
export default DashboardConfig