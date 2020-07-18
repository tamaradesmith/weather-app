import React, { useEffect } from 'react';
import * as d3 from "d3";
import { format } from 'date-fns';


function LineChart(props) {


  const { data, stateHeight, stateWidth, period } = props;

  let rotate = 30;
  let offset = 10;
  
  // function dateformate() {

  //   let formatDate
  //   switch (parseInt(period)) {
  //     case 1:
  //       formatDate = d3.timeFormat("%H h");
  //       rotate = 30;
  //       offset = 10;
        
  //       return data.map(date => {
  //         return formatDate(date.time)
  //       });
  //       break;
  //       case 7:
  //       formatDate = d3.timeFormat("%A");
  //       rotate = 0;
  //       offset = 0;

  //       return data.map(date => {
  //         date.time = formatDate(new Date (date.time))
         

  //         return
  //       });
  //       // const formated = data.map(date => { return format(new Date(date.time), "iiii") });
  //       // console.log("dateformate -> formated", formated);
  //       // return formated


  //       break;
  //     case 30:
  //       offset = 0;
  //       rotate = 0;
  //       // return format(new Date(date), "dd");
  //       break;
  //     case 365:
  //       offset = 0;
  //       rotate = 0;
  //       // return format(new Date(date), "MMM");
  //       break;
  //     default:
  //       break;
  //   };
  // };

 let height = 600

  
  // function setMax(array) {
  //   const max = Math.max.apply(Math, array.map(function (o) { return o.value; }))
  //   return max + (max / 4);
  // };

  // function setMin(array) {
  //   const min = Math.min.apply(Math, array.map(function (o) { return o.value; }))
  //   return min === 0 ? min : min - (min / 4);
  // };

function drawChart(){
  
    


let  margin = ({ top: 20, right: 20, bottom: 30, left: 30 })

  function hover(svg, path) {

    if ("ontouchstart" in document) svg
      .style("-webkit-tap-highlight-color", "transparent")
      .on("touchmove", moved)
      .on("touchstart", entered)
      .on("touchend", left)
    else svg
      .on("mousemove", moved)
      .on("mouseenter", entered)
      .on("mouseleave", left);

    const dot = svg.append("g")
      .attr("display", "none");

    dot.append("circle")
      .attr("r", 2.5);

    dot.append("text")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "middle")
      .attr("y", -8);

    function moved() {
      d3.event.preventDefault();
      const mouse = d3.mouse(this);
      const xm = x.invert(mouse[0]);
      const ym = y.invert(mouse[1]);
      const i1 = d3.bisectLeft(data.dates, xm, 1);
      const i0 = i1 - 1;
      const i = xm - data.dates[i0] > data.dates[i1] - xm ? i1 : i0;
      const s = d3.min(data.series, d => Math.abs(d.values[i] - ym));
      path.attr("stroke", d => d === s ? null : "#ddd").filter(d => d === s).raise();
      dot.attr("transform", `translate(${x(data.dates[i])},${y(s.values[i])})`);
      dot.select("text").text(s.name);
    }

    function entered() {
      path.style("mix-blend-mode", null).attr("stroke", "#ddd");
      dot.attr("display", null);
    }

    function left() {
      path.style("mix-blend-mode", "multiply").attr("stroke", null);
      dot.attr("display", "none");
    }
  }

  x = d3.scaleUtc()
    .domain(d3.extent(data.dates))
    .range([margin.left, width - margin.right])


  y = d3.scaleLinear()
    .domain([0, d3.max(data.series, d => d3.max(d.values))]).nice()
    .range([height - margin.bottom, margin.top])


  xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))


  yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y))
    .call(g => g.select(".domain").remove())
    .call(g => g.select(".tick:last-of-type text").clone()
      .attr("x", 3)
      .attr("text-anchor", "start")
      .attr("font-weight", "bold")
      .text(data.y))

  line = d3.line()
    .defined(d => !isNaN(d))
    .x((d, i) => x(data.dates[i]))
    .y(d => y(d))
  const svg = d3.create("svg")
    .attr("viewBox", [0, 0, width, height])
    .style("overflow", "visible");

  svg.append("g")
    .call(xAxis);

  svg.append("g")
    .call(yAxis);

  const path = svg.append("g")
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .selectAll("path")
    .data(data.series)
    .join("path")
    .style("mix-blend-mode", "multiply")
    .attr("d", d => line(d.values));

  svg.call(hover, path);

  return svg.node();
}

    // function drawChart() {
    //   // document.querySelector('.rowChart').innerHTML = null;
    //   // console.log(data)
    //   // const margin = { top: 20, right: 15, bottom: 60, left: 40 },
    //   //   width = stateWidth - margin.left - margin.right,
    //   //   height = stateHeight - margin.top - margin.bottom;


    //   // var datas = d3.nest() // nest function allows to group the calculation per level of a factor
    //   //   .key(function (d) { return d.name; })
    //   //   .entries(data);

        
    //   // // append the svg object to the body of the page
    //   // const svg = d3.select(".rowChart")
    //   //   .append("svg")
    //   //   .attr("width", width + margin.left + margin.right)
    //   //   .attr("height", height + margin.top + margin.bottom)
    //   //   .append("g")
    //   //   .attr("transform", `translate(${margin.left},${margin.top})`);

    //   // // Add X axis
    //   // const x = d3.scaleTime()
    //   //   .domain([new Date(data[0].time), new Date(data[data.length - 1].time)])
    //   //   .range([0, width]);

    //   // // Add Y axis
    //   // const y = d3.scaleLinear()
    //   //   .domain([setMax(data), setMin(data)])
    //   //   .range([0, height])


    //   // // create line

    //   // const lineGenerator = d3.line()
    //   //   .x(function (d) { return x(new Date(d.time)); })
    //   //   .y(function (d) { return y(d.value); });


    //   // svg.append("path")
    //   //   .data([data])
    //   //   .attr("class", "line")
    //   //   .attr("d", lineGenerator);

    //   // // add the X Axis
    //   // svg.append("g")
    //   //   .attr("transform", `translate(0, ${height})`)
    //   //   .attr('class', "axis-label")
    //   //   .call(d3.axisBottom(x).ticks(24))
    //   //   .selectAll("text")
    //   //   .attr("x", offset)
    //   //   .attr("transform", `rotate(${rotate})`)

    //   // // add the Y Axis
    //   // svg.append("g")
    //   //   .attr('class', "axis-label")
    //   //   .call(d3.axisLeft(y));

    // }

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