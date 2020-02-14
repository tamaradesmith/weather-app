import React, { useState } from "react";

function EditConfig(props) {
  const { item, type } = props;
  const [id, setId ] = useState(null)
  const [labels, setLabels] = useState(null);

  function setupLabels() {
    setId(item.id);
    const labelList = Object.keys(item);
    const omitList = ['id', 'createdAt', 'active'];
    const list = []
    labelList.forEach(label => {
      if (!omitList.includes(label)) {
        list.push(label)
      }
    });
    setLabels(list);
  };

  function handleCancel(event) {
    event.preventDefault();
    props.cancel();
  }

  function handleUpdate(event) {
    event.preventDefault();
    const item = document.querySelector("#editForm");
    const inputs = item.querySelectorAll('input');
    const formData = new FormData(item)
    const newItem = {}
    inputs.forEach(input => {
      newItem[input.name] = formData.get(input.name);
    })
    checkFields(newItem, item, inputs, "update")
  }

  function handleCreate(event) {
    event.preventDefault();
    const item = document.querySelector("#editForm");
    const inputs = item.querySelectorAll('input');
    const formData = new FormData(item)
    const newItem = {}
    inputs.forEach(input => {
      newItem[input.name] = formData.get(input.name);
    })
    checkFields(newItem, item, inputs, "create")
  }

  function checkFields(item, target, inputs, action) {
    let flag = true;
    inputs.forEach(input => {
      if (input.value === "") {
        input.classList.add("warning");
        flag = false;
      } else {
        input.classList.remove('warning');
      };
    });
    if (flag === true) {
      if (action === "create") {
        const itemType = type.slice(0, type.length - 1)
        props.create(itemType, item);
      } else if (action === "update") {
        props.update(type, item, id)
      }
      target.reset();
    };
  };

  if (labels === null) {
    setupLabels();
    return "Loading ..."
  }

  return (
    <form id="editForm" className="EditConfig">

      <h1> Edit {type}</h1>
      {labels.map((label, index) => (
        <div key={index} className="config-edit">
          <label htmlFor={label} className='capitlize'> {label} </label>
          <input type="text" name={label} defaultValue={item[label]} />
        </div>
      ))}
      <div className="config-edit">
        <label htmlFor="active">Active</label>
        <input type="checkbox" name="active" id="active" className="config-field config-checked" defaultChecked={(item.active === true) ? true : false} />
      </div>
      <div className="config-buttons">
        <button className="config-button button-edit" onClick={handleCancel}>Cancel</button>
        <button className="config-button button-edit" onClick={handleUpdate}>Save</button>
        <button className="config-button button-edit" onClick={handleCreate}> Save As</button>
      </div>
    </form>
  )
}

export default EditConfig;