const BarChart = require('./barChartData');
const LineChart = require('./lineChartData');
const MixChart = require('./mixChartData');


module.exports = {
  formateReadings(period, readings, properties) {
    if (readings.length === 0) {
      return readings;
    } else if (readings[0] === "partner") {
      let result = this.formateParnters(readings, period);
      return result;
    } else {
      const chart = {}
      properties.forEach(item => {
        chart[item.name] = item.value
      })
      if (readings) {
        let result;
        switch (parseInt(period)) {
          case 1:
            result = (chart.chart === 'bar') ? BarChart.dayBar(readings) : LineChart.dayLine(readings);
            break;
          case 7:
            result = (chart.chart === 'bar') ? BarChart.weekBar(readings) : LineChart.weekLine(readings, chart);
            break;
          case 30:
            result = (chart.chart === 'bar') ? BarChart.monthBar(readings) : LineChart.monthLine(readings, chart);
            break;
          case 365:
            result = (chart.chart === 'bar') ? BarChart.yearBar(readings) : LineChart.yearLine(readings, chart);
            break;
          default:
            result = (chart.chart === 'bar') ? BarChart.dayBar(readings) : LineChart.dayLine(readings);
            break;
        };
        return result;
      }
    }
  },




  formateParnters(readings, period) {
    readings.shift()
    let extra = null;

    const result = readings.map((sensor, index) => {
      let chart;
      let extraChart;
      sensor.chart.forEach(item => {
        if (item.name === 'mix') {
          chart = item.value;
        } else if (item.name === "extra") {
          extraChart = item.value;
        };
      });
      let readingResult;
      switch (parseInt(period)) {
        case 1:
          readingResult = (chart === 'bar') ? BarChart.dayBar(readings[index].sensor) : LineChart.dayLine(readings[index].sensor);
          break;
        case 7:
          readingResult = (chart === 'bar') ? BarChart.weekBar(readings[index].sensor) : LineChart.weekLine(readings[index].sensor, chart);
          break;
        case 30:
          readingResult = (chart === 'bar') ? BarChart.monthBar(readings[index].sensor) : LineChart.monthLine(readings[index].sensor, chart);
          break;
        case 365:
          readingResult = (chart === 'bar') ? BarChart.yearBar(readings[index].sensor) : LineChart.yearLine(readings[index].sensor, chart);
          break;
        default:
          readingResult = (chart === 'bar') ? BarChart.dayBar(readings[index].sensor) : LineChart.dayLine(readings[index].sensor);
          break;
      };
      // extra = extraChart === "gust" ? this.getGusts(readings[index].sensor, period) : null;
      return readingResult;
    });
    const matchReading = this.matchDates(result, extra)
    console.log("formateParnters -> matchReading", matchReading);
    return matchReading
  },

  matchDates(readings, extra) {
    console.log("matchDates -> readings", readings);
    let sensor1 = readings[0];
    let sensor2 = readings[1];

    let result = sensor1.map((item, index) => Object.assign({}, item, sensor2[index]));
    let resultExtra = null
    // if (extra) {
    //   resultExtra = result.map((item, index) => Object.assign({}, item, extra[index]));
    // };
    return (resultExtra) ? resultExtra : result;
  },

  // getGusts(readings, period) {
  //   const today = new Date();
  //   const startDate = today.getDate() - period;
  //   let currentDate;
  //   const result = [];
  //   let max = 0;
  //   readings.forEach((reading, index) => {
  //     const readingTime = reading.time;
  //     const readingDate = readingTime.getDate();
  //     const readingHour = readingTime.getHours();

  //     if (readingDate >= startDate) {
  //       currentDate = (!currentDate) ? readingTime : currentDate;
  //       if (readingHour === currentDate.getHours()) {
  //         if (max < reading.value) {
  //           max = reading.value;
  //         }
  //       } else {
  //         let time = new Date(currentDate);
  //         let hour = time.getHours();
  //         time = new Date(time.setHours(hour, 00, 00));
  //         result.push({ time, gust: parseFloat(max.toFixed(2)) });
  //         max = 0;
  //         currentDate = readingTime;
  //       }
  //       if (index === readings.length - 1) {
  //         let time = new Date(currentDate);
  //         let hour = time.getHours();
  //         time = new Date(time.setHours(hour, 00, 00));
  //         result.push({ time, gust: parseFloat(max.toFixed(2)) });
  //       };
  //     };
  //   });
  //   console.log("getGusts -> result", result);
  //   return result;
  // },
};