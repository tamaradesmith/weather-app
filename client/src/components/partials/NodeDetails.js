import React from 'react'


function NodeDetail(props) {
const { node} = props


  return (

    <div className="show-grid" >
      <p className="config-label"> Description: </p>
      <p className="config-field">{node.description}</p>

      <p className="config-label"> Site: </p>
      <p className="config-field">New Westmister</p>

      <p className="config-label"> Location: </p>
      <p className="config-field">{node.location}</p>

      <p className="config-label"> Type: </p>
      <p className="config-field">{node.type}</p>

      <p className="config-label"> Active:</p>
      <p className="config-field">{!node.active ? "false" : "true"}    </p>
    </div>
  )
}

export default NodeDetail