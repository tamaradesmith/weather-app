import React, { useEffect } from 'react';
import * as d3 from "d3";
import { format } from 'date-fns';

function MixChart(props) {
  const { stateHeight, stateWidth, data, period } = props;

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

    const line = d3.line()
      .defined(function (d) { return d.value !== null; })
      .x(function (d) { return x(dateformate(d.time)); })
      .y(function (d) { return y2(d.value); });

    // Axis X

    svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .attr('class', 'axis-label')
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("x", 0)
      .attr("transform", `rotate(${rotate})`)

    // Axis Ys

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

    // Y Axis Labels

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

    // Create Bars

    svg.append('g').selectAll('.bar')
      .data(data)
      .enter().append("rect")
      .attr("class", "bar-colour")
      .attr("x", function (d) { return x(dateformate(d.time)) })
      .attr("y", function (d) { return y(d.sum); })
      .attr("height", function (d) { return height - y(d.sum); })
      .transition()
      .duration(2000)
      .attr("width", x.bandwidth())

    // create Path

    svg.append("path")
      .data([data])
      .attr("class", 'line-mix')
      .attr("d", line);



    // Stacked Bars 

    // const stack = d3.stack()
    //   .keys(["gust", "sum"])
    //   .order(d3.stackOrderNone)
    //   .offset(d3.stackOffsetNone);

    // const series = stack(data);


    // const z = d3.scaleOrdinal()
    //   .domain([-0.5 * 4, 1.5 * 4])
    //   .range([ '#377eb8', '#4daf4a'])


    // let index = 1
    //     // Show the bars
    //     svg.append("g")
    //       .selectAll("g")
    //       // Enter in the stack data = loop key per key = group per group
    //       .data(series)
    //       .enter().append("g")
    //       .attr("fill", (d, i) => z(i))
    //       // .attr("fill", function (d) { return color(d.key); })
    //       .selectAll("rect")
    //       // enter a second time = loop subgroup per subgroup to add all rectangles
    //       .data(function (d) { return d; })
    //       .enter().append("rect")
    //       .attr("x", function (d) { return x(dateformate(d.data.time)); })
    //       .attr("y", function (d) {
    //         return y(d[1] - d[0]);
    //       })
    //       .attr('z', index )
    //       .attr("height", function (d) {
    //         index++
    //         return y(d[0]) - y(d[1]);
    //       })
    //       .attr("width", x.bandwidth())
  }

  useEffect(() => {
    if (data.length > 0) {
      try {
        drawChart();
      } catch (error) {
        console.error("MixChart -> error", error.message);
      };
    } else {
      document.querySelector('#chart').innerHTML = `<p>${props.message}</p>`;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div className="BarChart chart-div">
      <div id='chart' className="rowChart"></div>
    </div>
  );
};

export default MixChart;