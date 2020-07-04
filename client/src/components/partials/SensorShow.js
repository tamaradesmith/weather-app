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

  async function getSensor() {
    const sensorInfo = await Sensor.getSensor(sensorId);
    sensorInfo.chart = sensorInfo.chart || "line";
    setSensor(sensorInfo);
  };

  async function getReading() {
    const sensorReadings = await Sensor.getLast24Readings(sensorId);
    setData(sensorReadings);
  }

  function getWidthAndHeigth() {
    const width = document.querySelector('#chart').parentElement.offsetWidth;
    setWidth(width);
    const heigth = document.querySelector('#chart').parentElement.offsetHeight;
    setHeight(heigth);
  };


  useEffect(() => {
    getReading();
    getSensor();
  }, []);

  useEffect(() => {
    getWidthAndHeigth();
  }, [data])

  return (
    <div className="SensorShow chart">
      <div className="show-sensor-header capitlize">
        <h3>sensor: {sensor.name} </h3>
        <h3>location: {sensor.location}</h3>
      </div>
      {sensor.chart ===  "bar" ? (
        <BarChart data={data} stateWidth={stateWidth} stateHeight={stateHeight} />
      ) : (

      <LineChart data={data} stateWidth={stateWidth} stateHeight={stateHeight} />
      )}
      <div className="show-sensor-body capitlize">
      <p>type: {sensor.type}</p>
      <p>description: {sensor.description}</p>
      </div>
    </div>
  );
};

export default SensorShow;
