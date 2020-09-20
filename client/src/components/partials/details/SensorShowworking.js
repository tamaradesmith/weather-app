import React, { useEffect, useState } from 'react';
import * as d3 from "d3";
import '../../styles/chart.css';

import { Sensor } from '../../js/requests'

const data = [{ skill: "CSS", value: 80 }, { skill: "HTML", value: 70 }, { skill: "JS", value: 85 }, { skill: "ANGULAR", value: 90 }, { skill: "REACT", value: 75 }, { skill: "D3", value: 70 }, { skill: "NODE JS", value: 65 }, { skill: "JAVA", value: 65 }, { skill: "UI DESIGN", value: 70 }, { skill: "XD", value: 65 }];


function SensorShow(props) {

  const [data, setData] = useState([]);
  const [xAxisAttribute, setXAxisAttribute] = useState('value');
  const [yAxisAttribute, setYAxisAttribute] = useState('time');
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
    
    let margin = { top: 20, right: 30, bottom: 40, left: 90 },
    width = stateWidth - margin.left - margin.right,
    height = stateHeight - margin.top - margin.bottom;

    // append the svg object to the body of the page
    let svg = d3.select(".rowChart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
        
    // Add X axis
    let x = d3.scaleLinear()
      .domain([0, 100])
      .range([0, width]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .attr('class', 'axis x')
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Add Y axis
    let y = d3.scaleBand()
      .range([0, height])
      .domain(data.map((d) => d[yAxisAttribute]))
      .padding(.1);
    svg.append("g")
      .attr('class', 'axis y')
      .call(d3.axisLeft(y))
      .selectAll("text")
      .attr("dy", null)
      
    // Add Bars
    svg.selectAll("myRect")
      .data(data)
      .enter()
      .append("rect")
      .on('mouseover', function () {
        d3.select(this).style('opacity', 0.5)
      })
      .on('mouseout', function () {
        d3.select(this).style('opacity', 1)
      })
      .attr("x", x(0))
      .attr("y", (d) => y(d[yAxisAttribute]))
      .attr("width", 0)
      .attr("height", y.bandwidth() - 10)
      .attr("fill", "#DF337D")
      .transition(d3.transition().duration(1000))
      .attr("width", (d) => x(d[xAxisAttribute]))
  }


  useEffect(() => {
    getReading();
  }, []);

  useEffect(()=>{
    getWidthAndHeigth();
  },[data])

  useEffect(() => {
    if (stateHeight !== 0 && stateWidth !== 0) {
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