import React, { useEffect, useState } from 'react';
// import * as d3 from "d3";

import LineChart from './charts/LineChart';
import BarChart from './charts/BarChart';

import '../../styles/chart.css';

import { Sensor } from '../../js/requests'

function SensorShow(props) {

  const sensorId = props.match.params.id;

  const [data, setData] = useState([]);
  const [sensor, setSensor] = useState('');
  const [stateWidth, setWidth] = useState(0);
  const [stateHeight, setHeight] = useState(0);
  // const [chartCheck, setChartCheck] = useState('day');

  async function getSensor() {
    const sensorInfo = await Sensor.getSensor(sensorId);
    sensorInfo.chart = sensorInfo.chart || "line";
    setSensor(sensorInfo);
  };

  async function getReading(period) {
    const sensorReadings = await Sensor.getReadings(sensorId, period);
    setData(sensorReadings);
  }

  function getWidthAndHeigth() {
    const width = document.querySelector('#chart').parentElement.offsetWidth;
    setWidth(width);
    const heigth = document.querySelector('#chart').parentElement.offsetHeight;
    setHeight(heigth);
  };

  function chartChange(event) {
    const period = event.target.value;
    if (period){
      getReading(period)
    }
  }


  useEffect(() => {
    getReading(1);
    getSensor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getWidthAndHeigth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])



  return (

    <div className="SensorShow chart">
      <div className="show-sensor-header capitlize">
        <h3>sensor: {sensor.name} </h3>
        <h3>location: {sensor.location}</h3>
      </div>
      {sensor.chart === "bar" ? (
        <BarChart data={data} stateWidth={stateWidth} stateHeight={stateHeight} />
      ) : (

          <LineChart data={data} stateWidth={stateWidth} stateHeight={stateHeight} />
        )}


      <div className="show-sensor-body capitlize">
        <p>type: {sensor.type}</p>
        <p>description: {sensor.description}</p>



        <div onClick={chartChange}>

          <label htmlFor="day">Day
          </label>
          <input type="radio" name="peroid" id="day" value={1} className="radio-button" defaultChecked/>

          <label htmlFor="week">Week
          </label>
          <input type="radio" name="peroid" id="week" value={7} className="radio-button"  />

          <label htmlFor="month"> Month
          </label>
          <input type="radio" name="peroid" id="month" value={30} className="radio-button"  />

          <label htmlFor="year">Year
          </label>
          <input type="radio" name="peroid" id="year" value={364} className="radio-button"  />

          {/* </div>
        <div onChange={chartChange}>
          <input type="radio" value="Male" name="gender" /> Male
          <input type="radio" value="Female" name="gender" /> Female
         <input type="radio" value="Other" name="gender" /> Other
      </div> */}


        </div>
      </div>
    </div>
  );
};

export default SensorShow;
