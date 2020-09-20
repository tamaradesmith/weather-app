import React, { useEffect } from 'react';
import * as d3 from "d3";
import { format } from 'date-fns';


function LineChartTwo(props) {


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



  
  function setMax(array) {
    const max = Math.max.apply(Math, array.map(function (o) { return o.value; }))
    return max + (max / 4);
  };

  function setMin(array) {
    const min = Math.min.apply(Math, array.map(function (o) { return o.value; }))
    return min === 0 ? min : min - (min / 4);
  };

  function drawChart() {
    document.querySelector('.rowChart').innerHTML = null;
    const margin = { top: 20, right: 15, bottom: 60, left: 40 },
      width = stateWidth - margin.left - margin.right,
      height = stateHeight - margin.top - margin.bottom;


    // var datas = d3.nest() // nest function allows to group the calculation per level of a factor
    //   .key(function (d) { return d.name; })
    //   .entries(data);

      
    // append the svg object to the body of the page
    const svg = d3.select(".rowChart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Add X axis
    const x = d3.scaleTime()
      .domain([new Date(data[0][0].time), new Date(data[0][data.length - 1].time)])
      .range([0, width]);

    // Add Y axis
    const y = d3.scaleLinear()
      .domain([setMax(data[0]), setMin(data[0])])
      .range([0, height])


    // create line

    const lineGenerator = d3.line()
      .x(function (d) { return x(new Date(d.time)); })
      .y(function (d) { return y(d.value); });

data.forEach(set=> {

  svg.append("path")
  .data([set])
  .attr("class", "line")
  .attr("d", lineGenerator);
})

    // add the X Axis
    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .attr('class', "axis-label")
      .call(d3.axisBottom(x).ticks(24))
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

export default LineChartTwo;




// // set the dimensions and margins of the graph
//         var margin = {top: 20, right: 20, bottom: 30, left: 50},
//     width = 960 - margin.left - margin.right,
//     height = 500 - margin.top - margin.bottom;

// // parse the date / time
// var parseTime = d3.timeParse("%d-%b-%y");

// // set the ranges
// var x = d3.scaleTime().range([0, width]);
// var y = d3.scaleLinear().range([height, 0]);

// // define the 1st line
// var valueline = d3.line()
//     .x(function(d) { return x(d.date); })
//     .y(function(d) { return y(d.close); });

// // define the 2nd line
// var valueline2 = d3.line()
//     .x(function(d) { return x(d.date); })
//     .y(function(d) { return y(d.open); });

// // append the svg obgect to the body of the page
// // appends a 'group' element to 'svg'
// // moves the 'group' element to the top left margin
// var svg = d3.select("body").append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//     .attr("transform",
//           "translate(" + margin.left + "," + margin.top + ")");

// // Get the data
// d3.csv("data2.csv").then(function(data) {

//           // format the data
//           data.forEach(function (d) {
//             d.date = parseTime(d.date);
//             d.close = +d.close;
//             d.open = +d.open;
//           });

//   // Scale the range of the data
//   x.domain(d3.extent(data, function(d) { return d.date; }));
//   y.domain([0, d3.max(data, function(d) {
// 	  return Math.max(d.close, d.open); })]);

//   // Add the valueline path.
//   svg.append("path")
//       .data([data])
//       .attr("class", "line")
//       .attr("d", valueline);

//   // Add the valueline2 path.
//   svg.append("path")
//       .data([data])
//       .attr("class", "line")
//       .style("stroke", "red")
//       .attr("d", valueline2);

//   // Add the X Axis
//   svg.append("g")
//       .attr("transform", "translate(0," + height + ")")
//       .call(d3.axisBottom(x));

//   // Add the Y Axis
//   svg.append("g")
//       .call(d3.axisLeft(y));

// });

