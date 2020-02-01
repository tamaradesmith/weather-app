import React from "react";


function RainGauge(props){
  const {amount, label} = props
  console.log("TCL: RainGauge -> label", label)
  console.log((amount / label[1]))
  console.log("TCL: RainGauge -> label[3]", label[1])
  console.log("TCL: RainGauge -> amount", amount)
  return(

    <div className="rain-div">
      <div id="hour" className="rain-gauge" style={{
        'backgroundImage': `linear-gradient(transparent 0%, transparent ${100 - ((amount / label[1]) * 100)}%, blue ${100 - ((amount / label[1]) * 100)}% ,blue 100%)`
      }}></div>
      <p className="rain-text-top"> {label[1]} mm</p>
      <p className="rain-text-middle"> {label[2]} mm</p>
      <p className="rain-text-bottom"> {label[3]} mm</p>
      <p className="rain-label"> {label[0]}: {amount} mm </p>
    </div>
  )
}

export default RainGauge;