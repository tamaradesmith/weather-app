import React, { useEffect } from 'react';
import * as d3 from "d3";
import { format } from 'date-fns'

function BarChart(props) {

  const { data, stateHeight, stateWidth } = props;

  function dateformate(date) {

    return format(new Date(date), "hh mm a")
  }

  function drawChart() {

    const margin = { top: 20, right: 5, bottom: 75, left: 40 },
      width = stateWidth - margin.left - margin.right,
      height = stateHeight - margin.top - margin.bottom;


    const svg = d3.select(".rowChart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

 

    const x = d3.scaleBand()
      .domain(data.map(function (d) { return dateformate(d.time) }))
      .range([0, width])
      .padding(0.2)


    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .range([height , margin.top])

    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .attr('class', "axis-label")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("x", 30)
      .attr("transform", "rotate(45)")

    svg.append("g")
      .attr('class', "axis-label")
      .call(d3.axisLeft(y).ticks(10))
      .call(g => g.append("text")
        .attr("x", -margin.left)
        .attr("y", 15)
        .attr("text-anchor", "start")
        .text(data.y))


    svg.append("g").selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar-colour")
      .attr("x", function (d) { return x(dateformate(d.time)); })
      .attr("y", function (d) { return y(d.value); })
      .attr("width", x.bandwidth())
      .attr("height", function (d) { return height - y(d.value); });
  }

  useEffect(() => {
    if (data.length > 0) {
      drawChart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <div className="BarChart rowChart chart-div">

      <div id='path' className="path"></div>

    </div>
  );
};

export default BarChart