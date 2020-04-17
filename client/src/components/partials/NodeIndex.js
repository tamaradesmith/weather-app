import React from 'react';
import { Link } from "react-router-dom";


function NodeIndex(props) {

  const { nodes } = props;

  function handleClick(event) {
    props.findLocalNodes();
  }

  return (
    <div className="NodeIndex">
      <div className="link-div">
        <button className="config-button config-link" onClick={handleClick} >Add New Node</button>
      </div>
      <div className="config-list header">
        <h3>Name</h3>
        <h3>Description</h3>
        <h3>Location</h3>
        <p></p>
      </div>
      <div className="show-div">
        <div className="show-detail-div">

          {
            nodes.map((node, index) => (
              <div key={index} className="config-list">
                <Link to={`/node/${node.id}`}>{node.name}</Link>
                <p>{node.description}</p>
                <p>{node.location} </p>
                <button className="config-button">Update</button>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default NodeIndex