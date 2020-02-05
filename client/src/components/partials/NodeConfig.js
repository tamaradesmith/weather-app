import React, { useState } from "react";
import {Node } from "../../js/requests"

function NodeConfig(props) {
  const [nodeInfo, setNodeInfo] = useState([]);
  const [existingLocations, setExistingLocations] = useState([]);

 async function getNodesLoactions(){
    const locations = await Node.getNodesLocation();
    setExistingLocations(locations)
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    const { target } = event;
    const formData = new FormData(target)
    const newNode = {
      name: formData.get("name"),
      description: formData.get("description"),
      type: formData.get('type'),
      location: formData.get('location'),
      ipAddress: formData.get('ipAddress'),
      active: (formData.get(`active`) === "on") ? true : false
    };
    console.log("TCL: handleSubmit -> newNode", newNode)
  }
  
  if (existingLocations.length === 0){
    getNodesLoactions();
    return "loading..."
  }

  return (
    <form className="NodeConfig config-form" onSubmit={handleSubmit}>
      <h4 className="config-header">Node Configure</h4>
      <label htmlFor="name"> Name: </label>
      <input type="text" name="name" id='name' placeholder="Enter node name" className="config-field"></input>
      <label htmlFor="description">Node description</label>
      <input type="text" name="description" id="description" placeholder="Enter node description" className="config-field"></input>
      <label htmlFor="location">Node type</label>
      <select name="type" id="location" className="config-field config-select">
      {existingLocations.map((location, index )=> (
        <option key={index} value={location}> {location} </option>
      ))}
      </select>
      <label htmlFor="location">Node location</label>
      <input type="text" name="location" id="location" placeholder="Enter node location" className="config-field"></input>
      <label htmlFor="ipAddress">Node  IP Address</label>
      <input type="text" name="ipAddress" id="ipAddress" placeholder="Enter node IP Address" className="config-field"></input>
      <label htmlFor="active">Active</label>
      <input type="checkbox" name="active" id="active" className="config-field config-checked" defaultChecked />
      <button type="submit" className="config-button" > Create Node</button>
    </form>
  )
}
export default NodeConfig;