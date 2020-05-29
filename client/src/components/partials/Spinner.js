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
        if (index <= 17) {
          document.querySelector(`#paw${index}`).classList.remove('hidden');
          index++;
        } else if (index <= 34) {
          document.querySelector(`#paw${index - 17}`).classList.add('hidden');
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
      <img id="paw1" src={paw} alt={"spnner"} className="icon-spinner hidden paw1 " />
      <img id="paw2" src={paw} alt={"spnner"} className="icon-spinner hidden paw2 " />
      <img id="paw3" src={paw} alt={"spnner"} className="icon-spinner hidden paw3 " />
      <img id="paw4" src={paw} alt={"spnner"} className="icon-spinner hidden paw4 " />
      <img id="paw5" src={paw} alt={"spnner"} className="icon-spinner hidden paw5 " />
      <img id="paw6" src={paw} alt={"spnner"} className="icon-spinner hidden paw6 " />
      <img id="paw7" src={paw} alt={"spnner"} className="icon-spinner hidden paw7 " />
      <img id="paw8" src={paw} alt={"spnner"} className="icon-spinner hidden paw8 " />
      <img id="paw9" src={paw} alt={"spnner"} className="icon-spinner hidden paw9 " />
      <img id="paw10" src={paw} alt={"spnner"} className="icon-spinner hidden paw10 " />
      <img id="paw11" src={paw} alt={"spnner"} className="icon-spinner hidden paw11 " />
      <img id="paw12" src={paw} alt={"spnner"} className="icon-spinner hidden paw12 " />
      <img id="paw13" src={paw} alt={"spnner"} className="icon-spinner hidden paw13 " />
      <img id="paw14" src={paw} alt={"spnner"} className="icon-spinner hidden paw14 " />
      <img id="paw15" src={paw} alt={"spnner"} className="icon-spinner hidden paw15 " />
      <img id="paw16" src={paw} alt={"spnner"} className="icon-spinner hidden paw16 " />
      <img id="paw17" src={paw} alt={"spnner"} className="icon-spinner hidden paw17 " />
    </div>
  );
};

export default Spinner;