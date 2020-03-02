import React, { useState, useEffect } from "react";
import { Node } from "../../js/requests";

function NodeConfig(props) {
const { foundNodes } = props

  // const [foundNodes, setFoundNodes] = useState(foundNodes);
  const [nodeId, setNodeId] = useState(null);


  // async function findLocalNodes() {
  //   const nodes = await Node.searchForNodes();
  //   setFoundNodes(nodes);
  // }

  function handlePickNode(event) {
    const { target } = event;
    foundNodes.forEach((node, index) => {
      if (target.value === node.name) {
        document.querySelector("#ipaddress").value = foundNodes[index].ip;
        document.querySelector("#location").value = foundNodes[index].location;
        document.querySelector("#description").value = foundNodes[index].description;
        document.querySelector("#type").value = foundNodes[index].type;
      }
    })
    document.querySelector("#form").classList.remove("hidden");
    document.querySelector("#form").classList.add("config-form");
    document.querySelector("#createNode").disabled = false;
  }

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
      checkIfNodeExist(node);
    };
  };

  async function checkIfNodeExist(node) {
    const result = await Node.CheckIfNodeExist(node);
    setNodeId(result.id);
    if (result.value === 'false') {
      console.log("node saved");
    } else {
      document.querySelector("#message").classList.remove('hidden');
    }

  }
  function handleNodeShow() {
    props.redirect(nodeId, 'nodes');
  }

  function handleCancel(event) {
    event.preventDefault();
    props.history.push(`/DashboardConfig`);
  }

  // useEffect(() => {
  //   findLocalNodes();
  // }, [foundNodes === null])

  if (foundNodes === null) {
    return "Searching..."
  }


  return (
    <div className="NodeConfig view" >

      <form id="nodeForm" className="NodeConfig config-form" >
        <h4 className="config-header">Node Configure</h4>
        <label htmlFor="name"> Name: </label>
        <select name="name" id='name' className="config-field config-select" onChange={handlePickNode}>
          <option value=""></option>
          {foundNodes.map((node, index) => (
            <option key={index} name={node.name} value={node.name}>{node.name}</option>
          ))}
        </select>

        <div id="form" className="hidden form-column">

          <label htmlFor="description">Description</label>
          <input type="text" name="description" id="description" className="config-field" readOnly></input>

          <label htmlFor="location">Location</label>
          <input name="location" id="location" className="config-field" readOnly >
          </input>

          <label htmlFor="type">Type</label>
          <input type="text" name="type" id="type" placeholder="Enter node type" className="config-field" readOnly></input>

          <label htmlFor="ipAddress">IP Address</label>
          <input type="text" name="ipAddress" id="ipaddress" className="config-field" readOnly></input>

          <label htmlFor="active">Active</label>
          <input type="checkbox" name="active" id="active" className="config-field config-checked" defaultChecked />

        </div>
      </form>

      <div>
        <button type="cancel" id="cancel" className="config-button config-cancel" onClick={handleCancel}> Cancel</button>

        <button type="submit" id="createNode" className="config-button config-submit" onClick={handleSubmit} disabled> Create Node</button>
      </div>

      <div id='message' className="hidden">

        <p>Node already Exist, redirct to node page?</p>
        <button id="yes" className="config-button" onClick={handleNodeShow} >Yes</button>
        <button id="no" className="config-button" onClick={handleCancel} >No</button>
      </div>
    </div>
  )
}
export default NodeConfig;