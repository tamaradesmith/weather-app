import React, { useEffect } from 'react';
import * as d3 from "d3";


function BarChart(props) {

  const { data, stateHeight, stateWidth } = props;

  function setMax(array) {
    const max = Math.max.apply(Math, array.map(function (o) { return o.value; }))
    return max + (max / 4);
  };

  function drawChart() {

    const margin = { top: 20, right: 30, bottom: 60, left: 45 },
      width = stateWidth - margin.left - margin.right,
      height = stateHeight - margin.top - margin.bottom;


    const svg = d3.select(".rowChart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);


    // var bandScale = d3.scaleBand()
    //   .domain(['Mon', 'Tue', 'Wed', 'Thu', 'Fri'])
    //   .range([0, 200]);    

    const x = d3.scaleBand()
      .domain(d3.range(data.length))
      .range([margin.left, width - margin.right])
      .padding(0.1)

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .range([height - margin.bottom, margin.top])

    const xAxis = g => g
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x)) //.tickFormat(i => data[i].time).tickSizeOuter(0))

    const yAxis = g => g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(null, data.format))
      .call(g => g.select(".domain").remove())
      .call(g => g.append("text")
        .attr("x", -margin.left)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text(data.y))


    svg.append("g")
      .attr("fill", 'red')
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", (d, i) => x(i))
      .attr("y", d => y(d.value))
      .attr("height", d => y(0) - y(d.value))
      .attr("width", x.bandwidth());

    svg.append("g")
      .call(xAxis);

    svg.append("g")
      .call(yAxis);

  }

  useEffect(() => {

    console.log("BarChart -> data", data[0].time);
    if (data.length > 0) {
      drawChart();
    }
  }, [data])

  return (
    <div className="BarChart rowChart">

      <div id='path' className="path"></div>

    </div>
  );
};

export default BarChart