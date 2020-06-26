import React, { useState } from "react";
import { Redirect } from 'react-router-dom'
import { Node, Device, Sensor, Controller, Property } from '../js/requests';

import NodeIndex from './partials/NodeIndex'
import NodeConfig from "./partials/configure/NodeConfig";
import Spinner from './partials/Spinner';

function DashboardConfig(props) {

  const [currentView, setCurrentView] = useState(<NodeIndex />);


  async function findLocalNodes() {
    setCurrentView(<Spinner />);
    document.querySelector('#message').classList.add('hidden');
    document.querySelector("#message").classList.remove("message-div");
    document.querySelector('#search-button').classList.add('hidden');
    const nodes = await Node.searchForNodes();
    if (nodes.length === 0) {
      document.querySelector('#message').classList.remove('hidden');
      document.querySelector("#message").classList.add("message-div");

    } else {
      setCurrentView(<NodeConfig createNode={createNode} createDevice={createDevice} createSensor={createSensor} createController={createController} createProperty={createProperty} foundNodes={nodes} redirect={redirectToShow} cancel={handleCancel} />);
    };
  };

  function redirectToShow(id) {
    setCurrentView(null);
    props.history.push(`/node/${id}`);
  };

  function handleCancel() {
    document.querySelector('#search-button').classList.remove('hidden');
    document.querySelector('#message').classList.add('hidden');
    document.querySelector("#message").classList.remove("message-div");
    setCurrentView(<NodeIndex />);
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

  async function createProperty(info) {
    const result = await Property.create(info);
    return result;
  };

  if (props.admin) {

    return (
      <main className="ConfigNodes config">
        <button id="search-button" className="config-button" onClick={findLocalNodes}>Search For Nodes</button>

        {currentView}

        <div id='message' className="hidden">
          <p> No nodes located</p>
          <button className="config-button message-button2" onClick={findLocalNodes}> Search </button>
          <button className="config-button config-button-cancel message-button1" onClick={handleCancel}> Cancel</button>
        </div>

      </main>
    )
  } else {
    return <Redirect to='/nodes' />;
  };
};
export default DashboardConfig