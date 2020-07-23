import React, { useEffect } from 'react';
import * as d3 from "d3";
import { format } from 'date-fns';

function MixChart(props) {
  const { stateHeight, stateWidth, data } = props;
  console.log("MixChart -> data", data);

  function drawChart() {

    document.querySelector('.rowChart').innerHTML = null;

    const margin = { top: 20, right: 30, bottom: 60, left: 30 },
      width = stateWidth - margin.left - margin.right,
      height = stateHeight - margin.top - margin.bottom;

    const svg = d3.select('.rowChart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const x = d3.scaleBand()
      .domain(data.map(function (d) { return format(new Date(d.time), "ha") }))
      .range([0, width])
      .padding(0.2);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.sum)])
      .range([height, margin.top]);

    const y2 = d3.scaleLinear()
      .domain([0, 360])
      .range([height, margin.top])

    var line = d3.line()
      .x(function (d) { return x(format(new Date(d.time), "ha")); })
      .y(function (d) { return y2(d.value); });

    svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .attr('class', 'axis-label')
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("x", 0)
    // .attr("transform", `rotate(90)`)

    svg.append("g")
      .attr('class', "axis-label")
      .call(d3.axisLeft(y).ticks(10))
      .call(g => g.append("text")
        .attr("x", 0)
        .attr("y", 30)
        .attr("text-anchor", "start")
        .text(data.y))

    svg.append("g")
      .attr("transform", `translate( ${width}, 0 )`)
      .attr('class', "axis-label")
      .call(d3.axisRight(y2))
      .call(g => g.append("text")
        .attr("x", width)
        .attr("y", 15)
        .attr("text-anchor", "start")
        .text(data.y2))


    svg.append('g').selectAll('.bar')
      .data(data)
      .enter().append("rect")
      .attr("class", "bar-extra")
      .attr("x", function (d) { return x(format(new Date(d.time), "ha")) })
      .attr("y", function (d) { return y(d.gust); })
      .attr("height", function (d) { return height - y(d.gust); })
      .transition()
      .duration(2000)
      .attr("width", x.bandwidth())

    // svg.append('g').selectAll('.bar')
    //   .data(data)
    //   .enter().append("rect")
    //   .attr("class", "bar-colour")
    //   .attr("x", function (d) { return x(format(new Date(d.time), "ha")) })
    //   .attr("y", function (d) { return y(d.sum); })
    //   .attr("height", function (d) { return height - y(d.sum); })
    //   .transition()
    //   .duration(2000)
    //   .attr("width", x.bandwidth())

    svg.append("path")
      .data([data])
      .attr("class", 'line-mix')
      .attr("d", line);
  }

  useEffect(() => {
    if (data.length > 0) {
      try {
        drawChart();
      } catch (error) {
        console.log("MixChart -> error", error.message);
      }
    } else {
      document.querySelector('#chart').innerHTML = `<p>${props.message}</p>`;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (

    <div className="BarChart chart-div">
      <div id='chart' className="rowChart"></div>
    </div>
  )
};

export default MixChart;