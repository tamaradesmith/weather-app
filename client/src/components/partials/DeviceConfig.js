import React from "react";

function DeviceConfig(props) {

  const { node, count, deviceList } = props;


  if (deviceList === null) {
    return "loading"
  }


  return (
    <div className="DeviceConfig config-body ">
      <div id="deviceDiv">
        <form id="deviceForm" className="config-form">
          <h3 className="config-header">Device Configure</h3>

          <p>Node:</p>
          <p> {node.name}</p>

          <label htmlFor="name" className="config-label"> Device: </label>
          <input type="text" name="name" id="name" value={deviceList[count]['name']} className="config-field" readOnly></input>

          <label htmlFor="type" className="config-label" >Type: </label>
          <input type="text" name="type" id="type" value={deviceList[count]['type']} className="config-field" readOnly></input>

          <label htmlFor="description" className="config-label" >Description: </label>
          <input type="text" name="description" id="description" placeholder="Enter device description" className="config-field"></input>

          <label htmlFor="active">Active</label>
          <input type="checkbox" name="active" id="active" className="config-field config-checked" defaultChecked />

        </form>
      </div>
    </div>
  )
}

export default DeviceConfig;