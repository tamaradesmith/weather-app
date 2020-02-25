import React, { useState } from "react";
import { Crud } from "../../js/requests";

function NodeShow(props) {
  const [item, setItem] = useState(null);
  const [labels, setLabel] = useState([]);
  const omitList = ['id', 'createdAt', 'active'];


  async function getItemInfo() {
    const info = await Crud.getItemInfo(props.item, props.id)
    console.log("TCL: getItemInfo -> info", info)
    const labelList = Object.keys(info);
    const list = []
    labelList.forEach(label => {
      if (!omitList.includes(label)) {
        list.push(label)
      }
    });
    setItem(info);
    setLabel(list)
  }

  if (item === null) {
    getItemInfo();
    return "Loading..."
  }
  return (

    <div className="NodeShow ">
      <h3 className="gauge-header" >Node</h3>
      <div>
      </div>
      {labels.map((label, index) => (
        <div key={index} className="config-crud" >
          <p className="capitlize">{label}: </p>
          <p>{item[label]} </p>
        </div>
      ))}
      <div className="config-crud">

        <p> Active:</p>
        <p>{!item.active ? "false" : "true"}    </p>
      </div>
    </div>
  )
}

export default NodeShow;