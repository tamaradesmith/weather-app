import React, { useState, useEffect } from "react";
import { Node } from '../js/requests';
import { NavLink } from "react-router-dom"

import NodeConfigShow from './partials/NodeConfigShow'

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
      <div className="link-div">
        <NavLink to="/DashboardConfig/node/new" className="config-button config-link"  >Add New Node</NavLink>
        <NavLink to="/DashboardConfig/node/id:/devices/new" className="config-button config-link"  >Add New device</NavLink>
      </div>

      <NodeConfigShow nodes={nodes} />

    </main>
  )
}
export default DashboardConfig