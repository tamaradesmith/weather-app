import React from "react";

function PropertyConfig(props) {

  const { device, node, propertyList, propertyCount } = props;

  const currentProperty = propertyList[propertyCount];

  if (device === undefined) {
    return "Loading ... "
  }

  return (
    <form id="propertyForm" className="ProperConfig config-form-sensor">
      <h4 className="config-sensor-header">Properties</h4>
      <p className="config-label">Node: </p>
      <p className="config-field-sensor"> {node.name} </p>
      <p className="config-label">Device:</p>
      <p className="config-field-sensor"> {device.name} </p>

      <label htmlFor="name" className="config-label">Property:</label>
      <input type="text" name="name" id="name" className="config-field-sensor" value={propertyList[propertyCount].name} readOnly></input>

      <label htmlFor="description" className="config-label">Description:</label>
      <input type="text" name="description" id="description" className="config-field-sensor"></input>

      <label htmlFor="type" className="config-label">Type:</label>
      <input type="text" name="type" id="type" className="config-field-sensor" value={propertyList[propertyCount].type} readOnly ></input>

      <label htmlFor="location" className="config-label">Location:</label>
      <input type="text" name="location" id="location" className="config-field-sensor" value={node.location} readOnly></input>
      {propertyList[propertyCount].max ? (
        <>
          <label htmlFor="min" className="config-label">Min Value:</label>
          <input type="text" name="min" id="min" value={parseFloat(propertyList[propertyCount].min).toFixed(2)} className="config-min" readOnly></input>

          <label htmlFor="max" className="config-label-max">Max Value:</label>
          <input type="text" name="max" id="max" value={parseFloat(propertyList[propertyCount].max).toFixed(2)} className="config-max" readOnly></input>

          <label htmlFor="unit" className="config-label-unit">Unit:</label>
          <input type="text" name="unit" id="unit" defaultValue={propertyList[propertyCount].unit} className="config-unit"></input>
        </>
      ) : (null)}
      {currentProperty.members ? (
        <>
          <label htmlFor="members" className="config-label"> Members: </label>
          {currentProperty.members.member.map((item, index) => (
            <p key={index}> {item}</p>
          ))}
        </>
      ) : (null)}
      <label htmlFor="active" className="config-label">Active</label>
      <input type="checkbox" name="active" id="active" className="config-field-sensor config-checked" defaultChecked />

    </form>
  );
};

export default PropertyConfig;