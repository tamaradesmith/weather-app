import React from 'react'


function NodeDetail(props) {
  const { node, admin } = props

  function handleChange(event) {
    props.activeUpdate('node', event.target.id, event.target.checked)
  }

  return (

    <div className="show-grid" >
      <p className="config-label"> Description: </p>
      <p className="config-field">{node.description}</p>

      <p className="config-label"> Site: </p>
      <p className="config-field">{node.site}</p>

      <p className="config-label"> Location: </p>
      <p className="config-field">{node.location}</p>

      <p className="config-label"> Type: </p>
      <p className="config-field">{node.type}</p>

      <p className="config-label"> Active:</p>
      {admin ? (

        <input type="checkbox" id={node.id} defaultChecked={node.active === true ? true : false} className="show-node-check" onChange={handleChange} />
      ) : (
          <p>
            {node.active ? ("Actvie") : ("Disabled")}
          </p>
        )}
    </div>
  )
}

export default NodeDetail