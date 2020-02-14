import React, { useState } from "react";
import { Node } from "../../js/requests";

function NodeConfig(props) {

  const [existingLocations, setExistingLocations] = useState([]);

  async function getNodesLoactions() {
    let locations = await Node.getNodesLocation();
    if (locations.length === 0) {
      locations = ['inside', 'outside'];
    }
    setExistingLocations(locations);
  };

  function handleSubmit(event) {
    event.preventDefault();
    const node = document.querySelector('#nodeForm');
    const inputs = node.querySelectorAll('input, select');
    const formData = new FormData(node);
    const newNode = {
      name: formData.get("name"),
      description: formData.get("description"),
      type: formData.get('type'),
      location: (formData.get('location') !== "other") ? formData.get('location') : formData.get("locationOther"),
      ipaddress: formData.get('ipAddress'),
      active: (formData.get(`active`) === "on") ? true : false
    };
    checkFields(newNode, node, inputs);
  };

  function handleOther(event) {
    const { target } = event;
    if (target.value === "other") {
      document.querySelector("#location").classList.add("hidden");
      document.querySelector("#locationOther").classList.remove("hidden");
    };
  };

  function checkFields(node, target, inputs) {
    let flag = true;
    inputs.forEach(input => {
      if (input.value === "" || input.value === null) {
        const classes = `${input.classList.value}`;
        if (!classes.includes('hidden')) {
          input.classList.add('warning');
          flag = false;
        }
      };
    });
    if (flag === true) {
      inputs.forEach(input => {
        input.classList.remove('warning');
      });
      props.create('node', node);
      target.reset();
    };
  };
  function handleCancel(event) {
    event.preventDefault();
    props.cancel();
  }

  if (existingLocations.length === 0) {
    getNodesLoactions();
    return "loading..."
  }

  return (
    <form id="nodeForm" className="NodeConfig config-form" >
      <h4 className="config-header">Node Configure</h4>

      <label htmlFor="name"> Name: </label>
      <input type="text" name="name" id='name' placeholder="Enter node name" className="config-field"></input>

      <label htmlFor="description">Node description</label>
      <input type="text" name="description" id="description" placeholder="Enter node description" className="config-field"></input>

      <label htmlFor="location">Node location</label>
      <select name="location" id="location" className="config-field config-select" onChange={handleOther}>
        <option value=""></option>
        {existingLocations.map((location, index) => (
          <option key={index} value={location}> {location} </option>
        ))}
        <option value="other">Other</option>
      </select>
      {/* text input for other */}
      <input type="text" id="locationOther" name="locationOther" className="config-field hidden" placeholder="Enter Node location"></input>

      <label htmlFor="type">Node type</label>
      <input type="text" name="type" id="type" placeholder="Enter node type" className="config-field"></input>

      <label htmlFor="ipAddress">Node  IP Address</label>
      <input type="text" name="ipAddress" id="ipaddress" placeholder="Enter node IP Address" className="config-field"></input>

      <label htmlFor="active">Active</label>
      <input type="checkbox" name="active" id="active" className="config-field config-checked" defaultChecked />

      <button type="cancel" id="cancel" className="config-button config-cancel" onClick={handleCancel}> Cancel</button>

      <button type="submit" className="config-button config-submit" onClick={handleSubmit} > Create Node</button>
    </form>
  )
}
export default NodeConfig;