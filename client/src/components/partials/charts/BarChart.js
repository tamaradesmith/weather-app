import React, { useEffect } from 'react';
import * as d3 from "d3";


function BarChart(props) {

  const { data, stateHeight, stateWidth } = props;


  const parseDate = d3.isoParse
  function drawChart() {

    const margin = { top: 20, right: 5, bottom: 15, left: 25 },
      width = stateWidth - margin.left - margin.right,
      height = stateHeight - margin.top - margin.bottom;


    const svg = d3.select(".rowChart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);


    const x = d3.scaleBand()
      .domain(d3.range(data.length))
      .range([margin.left, width - margin.right])
      .padding(0.1)


    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .range([height - margin.bottom, margin.top])

    const xAxis = g => g
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .attr("fill", "#69b3a2")
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
      .attr('class', "axis-label")

      .call(xAxis);

    svg.append("g")
      .attr('class', "axis-label")

      .call(yAxis);

  }

  useEffect(() => {
    if (data.length > 0) {
      drawChart();
    }
  }, [data])

  return (
    <div className="BarChart rowChart chart-div">

      <div id='path' className="path"></div>

    </div>
  );
};

export default BarChart