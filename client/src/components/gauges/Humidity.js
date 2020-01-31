import React, {useState} from "react";

function Humidity(props) {
  
  const [loading, setLoading] = useState(null)
function updateBackground(){
const background = document.getElementById(`humidity`);
const start = 70;
const end = 75;
  background.style.backgroundImage = `linear-gradient(' transparent 0%, transparent ${start}, blue ${end}, blue 100%)`;
  background.innerText= "hi there"
}

return (
  <div className="Humidily">
      <div id="humidity" className="humidity-div">
        <p className="humidity-text">56%</p>
      </div>
      <button onClick={()=>{updateBackground()}}> click me

     </button>
    </div>
  )
}

export default Humidity