import React, { useState, useEffect } from "react";
import { Node } from '../js/requests';

// import NodeConfig from './partials/NodeConfig';
// import DeviceConfig from './partials/DeviceConfig';
// import SensorConfig from './partials/SensorConfig';
// import ControllerConfig from './partials/ControllerConfig';
// import EditConfig from './partials/EditConfig';
// import NodeShow from './partials/NodeShow';

function DashboardConfig(props) {

  const [nodes, setNodes] = useState([]);

  async function getAllNodes() {
    const nodes = await Node.getNodes()
    setNodes(nodes)
  }


  useEffect(() => {
    getAllNodes()
  }, [])

  return (
    <main className="ConfigNodes config">
      <button className="config-button" >Add New Node</button>
      <div className="config-list header">
        <h3>Name</h3>
        <h3>Description</h3>
        <h3>Location</h3>
        <h3></h3>
      </div>
      {nodes.map((node, index) => (
        <div key={index} className="config-list">
          <p>{node.name}</p>
          <p>{node.description}</p>
          <p>{node.location} </p>
          <button className="config-button">Update</button>
        </div>
      ))}



    </main>
  )
}
export default DashboardConfig