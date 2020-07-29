import React, { useEffect } from 'react';
import * as d3 from "d3";
// import { format } from 'date-fns';


function LineChart(props) {

  const { data, stateHeight, stateWidth, period, type } = props;

  let rotate = 30;
  let offset = 10;
  let ticks = 25

  function dateformate() {
    switch (parseInt(period)) {
      case 1:

        rotate = 30;
        offset = 10;
        ticks = 24;
        return d3.timeFormat("%I %p")
      case 7:
        rotate = 0;
        offset = 0;
        ticks = 8;
        return d3.timeFormat("%A");
      case 30:
        offset = 0;
        rotate = 0;
        ticks = 31;

        return d3.timeFormat("%d");
      case 365:
        offset = 0;
        rotate = 0;
        ticks = 12;

        return d3.timeFormat("%b");
      default:
        return d3.timeFormat("%I %p");
    };
  };



  function setMax(array) {
    const max = Math.max.apply(Math, array.map(function (maxValue) { return maxValue.value; }))
    return max + (max / 4);
  };

  function setMin(array) {
    const min = Math.min.apply(Math, array.map(function (minValue) { return minValue.value; }))
    return min === 0 ? min : min - (min / 4);
  };

  function drawChart() {

    document.querySelector('.rowChart').innerHTML = null;




    const margin = { top: 20, right: 30, bottom: 40, left: 40 },
      width = stateWidth - margin.left - margin.right,
      height = stateHeight - margin.top - margin.bottom;


    const svg = d3.select(".rowChart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);


    // Add Y axis
    const y = d3.scaleLinear()
      .domain([setMax(data), (type === 'temperature' ? 0 : setMin(data))])
      .range([0, height])
      .nice()

    // Add X axis
    let start = new Date(data[0].time)
    start = new Date(start.setMinutes(start.getMinutes() - 1))


    const x = d3.scaleTime()
      .domain([start, new Date(data[data.length - 1].time)])
      .range([0, width]);

    // create line
    const lineGenerator = d3.line()
      .defined(function (d) { return d.value !== null; })
      .x(function (d) { return x(new Date(d.time)); })
      .y(function (d) { return y(d.value); })

    // add the X Axis
    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .attr('class', "axis-label")
      .call(d3.axisBottom(x).tickFormat(dateformate()).ticks(ticks))
      .selectAll("text")
      .attr("x", offset)
      .attr('y', 10)
      .attr("transform", `rotate(${rotate})`)


    // add the Y Axis
    svg.append("g")
      .attr('class', "axis-label")
      .call(d3.axisLeft(y))
      .call(g => g.append("text")
        .attr("x", margin.left)
        .attr("y", 10)
        .attr("text-anchor", "end")
        .text(data.y))


    var parseDate = d3.timeFormat("%m/%e/%Y").parse,
      bisectDate = bisectDate = d3.bisector(function (d) { return d.time; }).left,
      formatValue = d3.format(","),
      dateFormatter = d3.timeFormat("%m/%d/%y");

    svg.append("path")
      .datum(data)
      .attr("class", type === 'temperature' ? "max-line" : 'line')
      .attr("d", lineGenerator)
      .on("mouseover", function () {
        const xMouse = x.invert(d3.mouse(this)[0]);
        const date = new Date(xMouse).toISOString()
        const i = bisectDate(data, date, 1);
        const reading = data[i - 1];
        const time = new Date(reading.time);
        const formate = dateformate()
        const hour = time.getHours();
        const newTime = formate(time)
        tooltip.text(`Time: ${(newTime)} ${'\n'} value:  ${reading.value}`)
        return tooltip.style("visibility", "visible")
      })
      .on("mouseout", () => setTimeout(() => {
        tooltip.style("visibility", "hidden")
      }, 3000))


    const tooltip = d3.select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("z-index", 10)
      .style("visibility", "hidden")
      .text("Simple text");

    // MIN Pathes  
    if (data[0].min || data[0].min === null) {
      const lineLowGenerator = d3.line()
        .defined(function (d) { return d.value !== null; })
        .x(function (d) { return x(new Date(d.time)); })
        .y(function (d) { return y(d.min); });

      svg.append("path")
        .data([data])
        .attr("class", "min-line")
        .attr("d", lineLowGenerator)
        .text(d => d.value)
        .on("mouseover", function () {
          const xMouse = x.invert(d3.mouse(this)[0]);
          const date = new Date(xMouse).toISOString()
          const i = bisectDate(data, date, 1);
          const reading = data[i - 1];
          const time = new Date(reading.time);
          const formate = dateformate()
          const hour = time.getHours();
          const newTime = formate(time)
          tooltip.text(`Time: ${(newTime)} ${'\n'} value:  ${reading.value}`)
          return tooltip.style("visibility", "visible")
        })
        .on("mouseout", () => setTimeout(() => {
          tooltip.style("visibility", "hidden")
        }, 3000))


    }

    // const mouseOver = function() {
    //   const xMouse = x.invert(d3.mouse(this)[0]);
    //   const date = new Date(xMouse).toISOString()
    //   const i = bisectDate(data, date, 1);
    //   const reading = data[i - 1];
    //   const time = new Date(reading.time);
    //   const hour = time.getHours();
    //   tooltip.text(`Time: ${(hour)} \n value:  ${reading.value}`)
    //   return tooltip.style("visibility", "visible")
    // })



  }


  useEffect(() => {

    if (data.length > 0) {
      // dateformate()
      drawChart();
    } else {
      // props.getReadings(period)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <div className="SensorShow chart-div">
      {props.message}
      <div id='chart' className="rowChart">
      </div>
    </div>
  );
};

export default LineChart;