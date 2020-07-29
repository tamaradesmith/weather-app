import React, { useEffect } from 'react';
import * as d3 from "d3";
import { format } from 'date-fns';

function BarChart(props) {

  const { data, stateHeight, stateWidth, period } = props;
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

    const margin = { top: 20, right: 5, bottom: 60, left: 40 },
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
      .domain([0, d3.max(data, d => d.sum)])
      .range([height, margin.top])

    // const yExtra = d3.scaleLinear()
    //   .domain([0, d3.max(data, d => d.gust)])
    //   .range([height, margin.top])

    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .attr('class', "axis-label")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("x", offset)
      .attr("transform", `rotate(${rotate})`)

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
      .enter()
      .append("rect")
      .attr("class", "bar-colour")
      .attr("x", function (d) { return x(dateformate(d.time)); })
      .attr("y", function (d) { return y(d.sum); })
      // .transition()
      // .duration(2000)
      .attr("width", x.bandwidth())
      .attr("height", function (d) { return height - y(d.sum); })
      .text(d => d.sum)
      .on("mouseover", d => { tooltip.text((d.sum).toFixed(2)); return tooltip.style("visibility", "visible") })
      .on("mouseout", () => tooltip.style("visibility", "hidden"))
      .on("mousemove", function () {
        return tooltip.style("top", (d3.event.pageY + 30) + "px")
          .style("left", (d3.event.pageX - 25) + "px");
      })


    const tooltip = d3.select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("z-index", 10)
      .style("visibility", "hidden")
      .text("Simple text");
  }

  useEffect(() => {
    if (data.length > 0) {
      drawChart(period);
    } else {
      document.querySelector('#chart').innerHTML = `<p>${props.message}</p>`;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div className="BarChart chart-div">
      <div id='chart' className="rowChart"></div>
    </div>
  );
};

export default BarChart