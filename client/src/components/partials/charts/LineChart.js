import React, { useEffect } from 'react';
import * as d3 from "d3";
import { format } from 'date-fns';


function LineChart(props) {


  const { data, stateHeight, stateWidth, period, type } = props;
  
  let rotate = 30;
  let offset = 10;

  function dateformate(date) {
   
    let formatDate
    switch (parseInt(period)) {
      case 1:
        formatDate = d3.timeFormat("%H");
        rotate = 30;
        offset = 10;
          const newDate =formatDate(date)
          return 
        break;
      case 7:
        formatDate = d3.timeFormat("%A");
        rotate = 0;
        offset = 0;
        return data.map(date => {
          date.time = formatDate(new Date(date.time))
          return
        });
        // const formated = data.map(date => { return format(new Date(date.time), "iiii") });
        // console.log("dateformate -> formated", formated);
        // return formated
        break;
      case 30:
        offset = 0;
        rotate = 0;
        // return format(new Date(date), "dd");
        break;
      case 365:
        offset = 0;
        rotate = 0;
        // return format(new Date(date), "MMM");
        break;
      default:
        break;
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

    const margin = { top: 20, right: 15, bottom: 40, left: 40 },
      width = stateWidth - margin.left - margin.right,
      height = stateHeight - margin.top - margin.bottom;


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
      .domain([setMax(data), (type === 'temperature' ? 0 : setMin(data))])
      .range([0, height])


    // create line
    const lineGenerator = d3.line()
      .x(function (d) { return x(new Date(d.time)); })
      .y(function (d) { return y(d.value); });

    svg.append("path")
      .data([data])
      .attr("class", type === 'temperature' ? "max-line" : 'line')
      .attr("d", lineGenerator);

    if (data[0].min) {
      const lineLowGenerator = d3.line()
        .x(function (d) { return x(new Date(d.time)); })
        .y(function (d) { return y(d.min); });

      svg.append("path")
        .data([data])
        .attr("class", "min-line")
        .attr("d", lineLowGenerator);
    }

    // add the X Axis
    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .attr('class', "axis-label")
      .call(d3.axisBottom(x).ticks(12))
      .selectAll("text")
      .attr("x", offset)
      .attr("transform", `rotate(${rotate})`)

    // add the Y Axis
    svg.append("g")
      .attr('class', "axis-label")
      .call(d3.axisLeft(y));

  }

  useEffect(() => {

    if (data.length > 0) {
      // dateformate()
      drawChart();
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