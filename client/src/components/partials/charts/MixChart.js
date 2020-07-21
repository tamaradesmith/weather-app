import React from 'react';
import * as d3 from "d3";


function MixChart(props) {
  console.log("MixChart -> props", props);
const {stateHeight, stateWidth, data } = props;

  function drawChart(){
    document.querySelector('.rowChart').innerHTML = null;

    const margin = { top: 20, right: 5, bottom: 60, left: 40 },
      width = stateWidth - margin.left - margin.right,
      height = stateHeight - margin.top - margin.bottom;

      const svg = d3.select('.rowChart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transfrom', `translate(${margin.left}, ${margin.top})`);

      const x = d3.scaleBand()
      .domain(data[0].map(function (d) {return d.time}))
      .range([0, width])
      .padding(0.2);

      const y = d3.scaleLinear()
      .domain([0, d3.max(data[0], d => d.value)]);

      svg.append('g')
      .attr('transform', `translated(0, ${height})`)
      .attr('class', 'axis-label')
      .call(d3.axisBottom(x))


      svg.append('g').selectAll('.bar')
      .data(data[0])
      .attr('class', 'bar-colur')
      .attr('x', function (d) {return x(d.time)})
      .attr('y', function(d) {return y(d.value)})
      .attr("height", function (d) { return height - y(d.value); })

  }
  return (

    <div className="BarChart chart-div">
      <div id='chart' className="rowChart"></div>
    </div>
  )
};

export default MixChart;