import React from 'react';

import rain from '../../images/rainfall.png';

function Rainfall(props) {

  const { label, amount, size  } = props;

  return (
    <div className="RainFall rain-div">
      <p className="rain-label"> {amount} mm </p>
      <div id="hour" className="rain-gauge" style={{
        'backgroundImage': `linear-gradient(transparent 0%, transparent ${100 - ((amount / label) * 100)}%, #2C7CB0 ${100 - ((amount / label) * 100)}% ,#2C7CB0 100%)`, 'width': size, 'height': size
      }}>
        <img src={rain} alt={"logo"} className="rain-img" />
      </div>
    </div>
  );
};

export default Rainfall;