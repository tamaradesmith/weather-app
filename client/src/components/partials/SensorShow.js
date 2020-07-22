import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';

import LineChart from './charts/LineChart';
import BarChart from './charts/BarChart';
import MixChart from './charts/MixChart';
import { Sensor } from '../../js/requests'

import '../../styles/chart.css';


function SensorShow(props) {

  const sensorId = props.match.params.id;

  const [data, setData] = useState([]);
  const [sensor, setSensor] = useState('');
  const [stateWidth, setWidth] = useState(0);
  const [stateHeight, setHeight] = useState(0);
  const [period, setPeriod] = useState(1);
  const [message, setMessage] = useState('loading');

  const [chart, setChart] = useState(<LineChart data={data} stateWidth={stateWidth} stateHeight={stateHeight} period={period} message={message} type={sensor.type} />);


  async function getSensor() {
    const sensorInfo = await Sensor.getSensor(sensorId);
    sensorInfo.chart = sensorInfo.chart || "line";
    setSensor(sensorInfo);
  };

  async function getReading(timePeriod) {
      const sensorReadings = await Sensor.getReadings(sensorId, timePeriod);
      setData(sensorReadings);
      if (sensorReadings.length > 0) {
        setHeader(sensorReadings[sensorReadings.length - 1] === "partner" ? sensorReadings[0][0].time : sensorReadings[0].time, timePeriod);
        setMessage("")
      } else {
        setMessage("No Sensor Reading for this time period")
      }
  }

  async function setChartType() {
    switch (sensor.chart) {
      case 'line':
        setChart(<LineChart data={data} stateWidth={stateWidth} stateHeight={stateHeight} period={period} message={message} type={sensor.type} />)
        break;
      case 'bar':
        setChart(<BarChart data={data} stateWidth={stateWidth} stateHeight={stateHeight} period={period} message={message} type={sensor.type} />)
        break;
      case 'mix':
        const partner = await Sensor.getPartnerSensor(sensor.id);
        setChart(<MixChart data={data} stateWidth={stateWidth} stateHeight={stateHeight} period={period} message={message} type={sensor.type} sensor={sensor} partner={partner} />)
        break;
      default:
        break;
    }
  }

  function setHeader(date, timePeriod) {
    let time;
    switch (parseInt(timePeriod)) {
      case 1:
        time = format(new Date(date), 'MMMM dd, yyyy');
        break;
      case 7:
        const formated = date ? format(new Date(date), 'do') : format(new Date(), 'do');

        time = formated ? `Week of ${formated}` : `Week of ${new Date()}`;
        break;
      case 30:
        time = format(new Date(date), 'MMMM yyyy');
        break;
      case 365:
        time = `Year of ${format(new Date(date), 'yyyy')}`;
        break;
      default:
        time = format(new Date(date), 'MMMM dd, yyyy');
        break;
    }
    document.querySelector('#timePeriod').innerText = time
  }
  function getWidthAndHeigth() {
    const width = document.querySelector('#chart').parentElement.offsetWidth;
    setWidth(width);
    const heigth = document.querySelector('#chart').parentElement.offsetHeight;
    setHeight(heigth);
  };

  function chartChange(event) {
    const newPeriod = event.target.value;
    if (newPeriod) {
      setPeriod(newPeriod)
      getReading(newPeriod)
    }
  }


  useEffect(() => {
    getReading(1);
    getSensor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setChartType();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  useEffect(() => {
    getWidthAndHeigth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chart])

  return (

    <div className="SensorShow chart">
      <div className="show-sensor-header capitlize">
        <h3>sensor: {sensor.name} </h3>
        <h3 id="timePeriod">checking</h3>
        <h3>location: {sensor.location}</h3>
      </div>
      <div id="chart-div">
        {chart}
      </div>

      <div className="show-sensor-body capitlize">
        <p>type: {sensor.type}</p>
        <p>description: {sensor.description}</p>


        <div onClick={chartChange}>

          <label htmlFor="day">Day
          </label>
          <input type="radio" name="peroid" id="day" value={1} className="radio-button" defaultChecked />

          <label htmlFor="week">Week
          </label>
          <input type="radio" name="peroid" id="week" value={7} className="radio-button" />

          <label htmlFor="month"> Month
          </label>
          <input type="radio" name="peroid" id="month" value={30} className="radio-button" />

          <label htmlFor="year">Year
          </label>
          <input type="radio" name="peroid" id="year" value={365} className="radio-button" />

        </div>
      </div>
    </div>
  );
};

export default SensorShow;
