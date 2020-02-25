import React, { useState } from "react";
import { Crud } from '../js/requests';

import NodeConfig from './partials/NodeConfig';
import DeviceConfig from './partials/DeviceConfig';
import SensorConfig from './partials/SensorConfig';
import ControllerConfig from './partials/ControllerConfig';
import EditConfig from './partials/EditConfig';
import NodeShow from './partials/NodeShow';

function DashboardConfig(props) {
  const [form, setForm] = useState(null);
  const [hidden, setHidden] = useState(false);
  const [hiddenEdit, setHiddenEdit] = useState(true);
  const [list, setList] = useState([]);
  const [editType, setEditType] = useState("");


  function handleChange(value) {
    switch (value) {
      case 'node':
        setForm(<NodeConfig create={create} cancel={cancel} redirect={redirectTo} />);
        setHidden(true);
        break;
      case 'device':
        setForm(<DeviceConfig create={create} cancel={cancel} />);
        setHidden(true);
        break;
      case 'sensor':
        setForm(<SensorConfig create={create} cancel={cancel} />);
        setHidden(true)
        break;
      case 'controller':
        setForm(<ControllerConfig create={create} cancel={cancel} />);
        setHidden(true);
        break;
      case "":
        break;
      default:
        setHiddenEdit(false);
        existingList(value)
        break;
    }
  }
  async function handleEdit(event) {
    event.preventDefault();
    const { target } = event;
    const type = document.querySelector("#edit").value;
    const info = await Crud.getItemInfo(type, target.id);
    setForm(<EditConfig create={create} cancel={cancel} update={update} item={info} type={type}  />);
    setHiddenEdit(true);

  };

  async function existingList(type) {
    let list = await Crud.getExisting(type);
    setEditType(type);
    setHidden(true);
    list = (list.length === 0) ? [{ name: "No Existing" }] : list;
    setList(list)
  }

  function resetView() {
    setForm(null);
    setHidden(false);
    setHiddenEdit(true);
    setList([]);
    document.querySelector(`#new`).value = "";
    document.querySelector(`#edit`).value = "";
  }

  function create(type, info) {
    Crud.create(type, info);
    resetView();
  }
  function update(type, info, id){
    Crud.update(type, info, id);
    resetView();
  }

  function cancel() {
    resetView();
  }
function redirectTo(id, item){
  setForm(<NodeShow id={id} item={item} />);

}
  return (
    <main className="ConfigNodes config">
      <div className={hidden ? 'hidden' : null}>
        <div className="config-crud">
          <label htmlFor="newItem">Create New: </label>
          <select className="config-select" id="new" onChange={event => handleChange(event.target.value)}>
            <option value=""></option>
            <option value="node">Node</option>
            <option value="device">Device</option>
            <option value="sensor">Sensor</option>
            <option value="controller">Controller</option>
          </select>

          <label htmlFor="newItem">Edit: </label>
          <select id="edit" className="config-select " onChange={event => handleChange(event.target.value)}>
            <option value=""></option>
            <option value="nodes">Node</option>
            <option value="devices">Device</option>
            <option value="sensors">Sensor</option>
            <option value="controllers">Controller</option>
          </select>
        </div>
      </div>

      <div className={hiddenEdit ? 'hidden' : null} >
        <h4 className="config-header capitlize">Existing {editType}</h4>
        <div className="edit-list edit-list-header">
          <p>Name</p>
          <p>{(editType === 'sensors' || editType === 'controllers') ? "Propose" : 'Description'} </p>
        </div>
        <div className="edit-div">
          <div className="list-scoll">
            {list.map(item => (
              <div key={item.id} className="edit-list">
                <p> {item.name} </p>
                <p> {(editType === 'sensors' || editType === 'controllers') ? item.propose : item.description} </p>
                <button id={item.id} className="config-button edit-list-button" onClick={handleEdit} >Edit</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <NodeShow id="16" item="nodes" /> */}
      <div className="inputs">
        {form}
      </div>
    </main>
  )
}
export default DashboardConfig