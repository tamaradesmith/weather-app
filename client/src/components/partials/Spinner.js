import React from 'react';
import paw from '../../images/paw1.png';
import '../../styles/spinner.css';

function Spinner(props) {

  function spinning() {
    let index = 1;
    const spin = setInterval(() => {
      if (document.querySelector('#paw1') === null) {
        setTimeout(() => {
          if (document.querySelector('#paw1') === null) {
            clearInterval(spin);
          }
        }, 500);
      } else {
        if (index <= 11) {
          document.querySelector(`#paw${index}`).classList.remove('hidden');
          index++;
        } else if (index <= 22) {
          document.querySelector(`#paw${index - 11}`).classList.add('hidden');
          index++;
        } else {
          index = 1;
        }
      };
    }, 1000);
  };
  spinning()

  return (

    <div className="spinner-div">
      <p className="spinner-text">  Hunting for Nodes....</p>
      <img id="paw1" src={paw} alt={"spnner"} className="icon-spinner paw1 hidden" />
      <img id="paw2" src={paw} alt={"spnner"} className="icon-spinner paw2 hidden" />
      <img id="paw3" src={paw} alt={"spnner"} className="icon-spinner paw3 hidden" />
      <img id="paw4" src={paw} alt={"spnner"} className="icon-spinner paw4 hidden" />
      <img id="paw5" src={paw} alt={"spnner"} className="icon-spinner paw5 hidden" />
      <img id="paw6" src={paw} alt={"spnner"} className="icon-spinner paw6 hidden" />
      <img id="paw7" src={paw} alt={"spnner"} className="icon-spinner paw7 hidden" />
      <img id="paw8" src={paw} alt={"spnner"} className="icon-spinner paw8 hidden" />
      <img id="paw9" src={paw} alt={"spnner"} className="icon-spinner paw9 hidden" />
      <img id="paw10" src={paw} alt={"spnner"} className="icon-spinner paw10 hidden" />
      <img id="paw11" src={paw} alt={"spnner"} className="icon-spinner paw11 hidden" />
    </div>
  );
};

export default Spinner;