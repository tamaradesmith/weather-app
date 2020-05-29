import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Node } from '../../js/requests';

function NodeIndex(props) {

  const [nodes, setNodes] = useState([]);

  async function getAllNodes() {
    const getNodes = await Node.getNodes()
    setNodes(getNodes);
  }

  useEffect(() => {
    getAllNodes();
  }, [])

  return (
    <div className="NodeIndex index-view">
      <div className="config-list header">
        <h3>Node</h3>
        <h3>Description</h3>
        <h3>Location</h3>
        <p> Status</p>

      </div>
      <div className="show-div">
        <div className="show-detail-div">
          {
            nodes.map((node, index) => (
              <div key={index} className="config-list">
                <Link to={`/node/${node.id}`}>{node.name}</Link>
                <p>{node.description}</p>
                <p>{node.location} </p>
                <p>{node.active ? ("Actvie") : ("Disabled")}</p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default NodeIndex