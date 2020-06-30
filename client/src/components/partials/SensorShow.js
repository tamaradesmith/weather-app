import React, { useEffect, useState } from 'react';
import * as d3 from "d3";


import { format } from 'date-fns';
import '../../styles/chart.css';

import { Sensor } from '../../js/requests'


function formatTime(array) {
  const result = array.map(reading => {
    const newTime = format(new Date(reading.time), 'hh-mm-ss')
    reading.time = newTime;
    return reading
  })
  return result;
}

function SensorShow(props) {

  const [data, setData] = useState([]);
  const [xAxisAttribute, setXAxisAttribute] = useState('time');
  const [yAxisAttribute, setYAxisAttribute] = useState('value');
  const [stateWidth, setWidth] = useState(0);
  const [stateHeight, setHeight] = useState(0);


  async function getReading() {
    const sensorReadings = await Sensor.getLast24Readings(props.match.params.id)
    setData(sensorReadings);
  }


  function getWidthAndHeigth() {
    const width = document.querySelector('#chart').parentElement.offsetWidth;
    setWidth(width);
    const heigth = document.querySelector('#chart').parentElement.offsetHeight;
    setHeight(heigth);
  };


  function drawChart() {

    let margin = { top: 20, right: 30, bottom: 50, left: 30 },
      width = stateWidth - margin.left - margin.right,
      height = stateHeight - margin.top - margin.bottom;

    // append the svg object to the body of the page
    let svg = d3.select(".rowChart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);


    // Add X axis

    let x = d3.scaleTime()
      .domain([new Date(data[data.length-1].time), new Date(data[0].time)])
      .range([0, width]);
    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .attr('class', 'axis x')
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");




    // // Add Y axis
    let y = d3.scaleLinear()
      .domain([40, -15])
      .range([0, height])
    svg.append("g")
      .attr('class', 'axis y')
      .call(d3.axisLeft(y))
      .selectAll("text")
      .attr("dy", null)

    // Add Bars
  //   svg.selectAll("myRect")
  //     .data(data)
  //     .enter()
  //     .append("rect")
  //     .on('mouseover', function () {
  //       d3.select(this).style('opacity', 0.5)
  //     })
  //     .on('mouseout', function () {
  //       d3.select(this).style('opacity', 1)
  //     })
  //     .attr("x", x(0))
  //     .attr("y", (d) => y(d[yAxisAttribute]))
  //     .attr("width", 0)
  //     .attr("height", y.bandwidth() - 10)
  //     .attr("fill", "#3e517a")
  //     .transition(d3.transition().duration(1000))
  //     .attr("width", (d) => x(d[xAxisAttribute]))
  }


  useEffect(() => {
    getReading();
  }, []);

  useEffect(() => {
    console.log(data)
    getWidthAndHeigth();
  }, [data])

  useEffect(() => {
    if (stateHeight !== 0 && stateWidth !== 0) {
      console.log(data);
      drawChart();
    }
  }, [data]);

  return (
    <div className="SensorShow chart-div">
      <div id='chart' className="rowChart"> </div>
    </div>
  );
};

export default SensorShow;