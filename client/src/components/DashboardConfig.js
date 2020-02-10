import React, { useState } from "react";
import NodeConfig from './partials/NodeConfig';
import DeviceConfig from './partials/DeviceConfig';
import SensorConfig from './partials/SensorConfig';
import ControllerConfig from './partials/ControllerConfig';
import { Crud } from '../js/requests';

function DashboardConfig(props) {
  const [form, setForm] = useState(null);
  const [hidden, setHidden] = useState(false);
  const [hiddenEdit, setHiddenEdit] = useState(true);
  const [list, setList] = useState([]);

  function handleChange(value) {
    switch (value) {
      case 'node':
        setForm(<NodeConfig create={create} />);
        setHidden(true);
        break;
      case 'device':
        setForm(<DeviceConfig create={create} />);
        setHidden(true);
        break;
      case 'sensor':
        setForm(<SensorConfig create={create} />);
        setHidden(true)
        break;
      case 'controller':
        setForm(<ControllerConfig create={create} />);
        setHidden(true);
        break;
      default:
        setHiddenEdit(false);
        existingList(value)
        break;
    }
  }
  async function existingList(type) {
    const list = await Crud.getExisting(type);
    setList(list)
    setHidden(true)
    // console.log("TCL: existingList -> list", list)
  }
  function resetView() {
    setForm(null);
    setHidden(false);
  }
  function create(type, info) {
    Crud.create(type, info);
    resetView();
  }

  return (
    <main className="ConfigNodes config">
      <div className={hidden ? 'hidden' : null}>
        <div className="config-crud">

          <label htmlFor="newItem">Create New: </label>
          <select className="config-select " onChange={event => handleChange(event.target.value)}>
            <option value=""></option>
            <option value="node">Node</option>
            <option value="device">Device</option>
            <option value="sensor">Sensor</option>
            <option value="controller">Controller</option>
          </select>

          <label htmlFor="newItem">Edit: </label>
          <select className="config-select " onChange={event => handleChange(event.target.value)}>
            <option value=""></option>
            <option value="nodes">Node</option>
            <option value="devices">Device</option>
            <option value="sensors">Sensor</option>
            <option value="controllers">Controller</option>
          </select>
        </div>
      </div>
      <div className={hiddenEdit ? 'hidden' : null} >

        <h4 className="config-header">Existing</h4>
        <div className="edit-list edit-list-header">
          <p>Name</p>
          <p>Description</p>
        </div>
        <div className="edit-div">
          <div className="list-scoll">

            {list.map(item => (
              <div key={item.id} className="edit-list">
                <p> {item.name} </p>
                <p> {item.description}</p>
                <button>Edit</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="inputs">
        {form}
      </div>
      {/* <NodeConfig /> */}
    </main>
  )
}
export default DashboardConfig