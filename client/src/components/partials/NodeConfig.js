import React, {useState} from "react";

function NodeConfig(props) {
  return (
    <form className="NodeConfig config-form">
    <h4 className="config-header">Node Configure</h4>
      <label htmlFor="name"> Name: </label>
      <input type="text" name="name" id='name' placeholder="Enter node name" className="config-field"></input>
      <label htmlFor="description">Node description</label>
      <input type="text" name="description" id="description" placeholder="Enter node description" className="config-field"></input> 
      <label htmlFor="type">Node type</label>
      <input type="text" name="type" id="type" placeholder="Enter node type" className="config-field"></input> 
      <label htmlFor="location">Node location</label>
      <input type="text" name="location" id="location" placeholder="Enter node location" className="config-field"></input> 
      <label htmlFor="ipAddress">Node  IP Address</label>
      <input type="text" name="ipAddress" id="ipAddress" placeholder="Enter node IP Address" className="config-field"></input> 
      <label htmlFor="active">Active</label>
      <input type="checkbox" name="active" id="active" className="config-field config-checked" defaultChecked /> 
    </form>
  )
}
export default NodeConfig;