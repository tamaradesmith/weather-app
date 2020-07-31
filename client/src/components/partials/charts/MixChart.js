import React, { useEffect } from 'react';
import * as d3 from "d3";
import { format } from 'date-fns';

function MixChart(props) {
  const { stateHeight, stateWidth, data, period } = props;
  console.log("MixChart -> data", data);


  let rotate = 30;
  let offset = 10;

  function dateformate(date) {
    switch (parseInt(period)) {
      case 1:
        rotate = 30;
        offset = 10;
        return format(new Date(date), "ha");
      case 7:
        rotate = 0;
        offset = 0;
        return format(new Date(date), "iiii");
      case 30:
        offset = 0;
        rotate = 0;
        return format(new Date(date), "dd");
      case 365:
        offset = 0;
        rotate = 0;
        return format(new Date(date), "MMM");
      default:
        break;
    }
  }

  function drawChart() {

    document.querySelector('.rowChart').innerHTML = null;

    const margin = { top: 20, right: 55, bottom: 60, left: 50 },
      width = stateWidth - margin.left - margin.right,
      height = stateHeight - margin.top - margin.bottom;

    const svg = d3.select('.rowChart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const x = d3.scaleBand()
      .domain(data.map(function (d) { return dateformate(d.time) }))
      .range([0, width])
      .padding(0.2);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.sum)])
      .range([height, margin.top]);

    const y2 = d3.scaleLinear()
      .domain([0, 360])
      .range([height, margin.top])

    var line = d3.line()
      .defined(function (d) { return d.value !== null; })
      .x(function (d) { return x(dateformate(d.time)); })
      .y(function (d) { return y2(d.value); });


    var stack = d3.stack()
      .keys(["sum", "gust","time"])
      .order(d3.stackOrderNone)
      .offset(d3.stackOffsetNone);

    var series = stack(data);



    svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .attr('class', 'axis-label')
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("x", 0)
      .attr("transform", `rotate(${rotate})`)

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


    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left - 5)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Wind Speed");

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 + width + 25)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Wind Direction");

    // svg.append('g').selectAll('.bar')
    //   .data(data)
    //   .enter().append("rect")
    //   .attr("class", "bar-extra")
    //   .attr("x", function (d) { return x(format(new Date(d.time), "ha")) })
    //   .attr("y", function (d) { return y(d.gust); })
    //   .attr("height", function (d) { return height - y(d.gust); })
    //   .transition()
    //   .duration(2000)
    //   .attr("width", x.bandwidth())

    // svg.append('g').selectAll('.bar')
    //   .data(data)
    //   .enter().append("rect")
    //   .attr("class", "bar-colour")
    //   .attr("x", function (d) { return x(dateformate(d.time)) })
    //   .attr("y", function (d) { return y(d.sum); })
    //   .attr("height", function (d) { return height - y(d.sum); })
    //   .transition()
    //   .duration(2000)
    //   .attr("width", x.bandwidth())



    const color = d3.scaleOrdinal()
      .domain(data)
      .range(['#e41a1c', '#377eb8', '#4daf4a'])

    //stack the data? --> stack per subgroup
    // const stackedData = d3.stack()
    //   .keys(data)
    //   (data)

    // Show the bars
    svg.append("g")
      .selectAll("g")
      // Enter in the stack data = loop key per key = group per group
      .data(series)
      .enter().append("g")
      .attr("fill", function (d) { return color(d.key); })
      .selectAll("rect")
      // enter a second time = loop subgroup per subgroup to add all rectangles
      .data(function (d) {  return d; })

      .enter().append("rect")
      .attr("x", function (d) { return x(dateformate(d.data.time)); })
      .attr("y", function (d) { return y(d[1]); })
      .attr("height", function (d) { return y(d[0]) - y(d[1]); })
      .attr("width", x.bandwidth())

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