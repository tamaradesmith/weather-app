import React, { useEffect } from 'react';
import * as d3 from "d3";

function LineChart(props) {


  const { data, stateHeight, stateWidth } = props;


  function setMax(array) {
    const max = Math.max.apply(Math, array.map(function (o) { return o.value; }))
    return max + (max / 4);
  };
  function setMin(array) {
    const min = Math.min.apply(Math, array.map(function (o) { return o.value; }))
   return min === 0 ? min : min - (min/4);
}

  function drawChart() {

    const margin = { top: 20, right: 15, bottom: 60, left: 40 },
      width = stateWidth - margin.left - margin.right,
      height = stateHeight - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3.select(".rowChart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Add X axis
    const x = d3.scaleTime()
      .domain([new Date(data[0].time), new Date(data[data.length - 1].time)])
      .range([0, width]);

    // Add Y axis
    const y = d3.scaleLinear()
      .domain([setMax(data), setMin(data)])
      .range([0, height])


    // create line

    const lineGenerator = d3.line()
      .x(function (d) { return x(new Date(d.time)); })
      .y(function (d) { return y(d.value); });


    svg.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", lineGenerator);

    // add the X Axis
    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .attr('class', "axis-label")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("x", 25)
      .attr("transform", "rotate(45)")

    // add the Y Axis
    svg.append("g")
      .attr('class', "axis-label")
      .call(d3.axisLeft(y));

  }

  useEffect(() => {

    if (data.length > 0) {
      drawChart();
    }
  }, [data])

  return (
    <div className="SensorShow chart-div">
      <div id='chart' className="rowChart">
        <div id='path' className="path"></div>
      </div>
    </div>
  );
};

export default LineChart;