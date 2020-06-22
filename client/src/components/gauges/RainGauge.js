import React from "react";
import rain from '../../images/rainfall.png'

function RainGauge(props) {
  
  const { amount, label } = props;

  return (
    <div className="rain-div">
      <div id="hour" className="rain-gauge" style={{
        'backgroundImage': `linear-gradient(transparent 0%, transparent ${100 - ((amount / label[1]) * 100)}%, #2C7CB0 ${100 - ((amount / label[1]) * 100)}% ,#2C7CB0 100%)`
      }}>
        <img src={rain} alt={"logo"} className="rain-img" />
      </div>
      <p className="rain-text-top"> {label[1]} mm</p>
      <p className="rain-text-middle"> {label[2]} mm</p>
      <p className="rain-text-bottom"> {label[3]} mm</p>
      <p className="rain-label"> {label[0]}: {amount} mm </p>
    </div>
  )
}

export default RainGauge;