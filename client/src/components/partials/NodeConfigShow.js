import React from 'react';

function NodeConfigShow(props) {
 
  const { nodes } = props;

  return (
    <div className="NodeConfigShow">

      <div className="config-list header">
        <h3>Name</h3>
        <h3>Description</h3>
        <h3>Location</h3>
        <p></p>
      </div>
      {
        nodes.map((node, index) => (
          <div key={index} className="config-list">
            <p>{node.name}</p>
            <p>{node.description}</p>
            <p>{node.location} </p>
            <button className="config-button">Update</button>
          </div>
        ))
      }
    </div>
  )
}

export default NodeConfigShow