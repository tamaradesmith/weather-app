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
            result = (chart.chart === 'bar') ? this.dayBar(readings) : LineChart.dayLine(readings);
            break;
          case 7:
            result = (chart.chart === 'bar') ? this.weekBar(readings) : LineChart.weekLine(readings, chart);
            break;
          case 30:
            result = (chart.chart === 'bar') ? this.monthBar(readings) : LineChart.monthLine(readings, chart);
            break;
          case 365:
            result = (chart.chart === 'bar') ? this.yearBar(readings) : LineChart.yearLine(readings, chart);
            break;
          default:
            result = (chart.chart === 'bar') ? this.dayBar(readings) : this.dayLine(readings);
            break;
        };
        return result;
      }
    }
  },

  dayBar(readings) {
    const today = new Date();
    const date = today.getDate();
    let hour = 0;
    let sum = 0;
    const result = [];
    readings.forEach((reading, index) => {
      const readingTime = reading.time;
      const readingHour = readingTime.getHours();
      if (readingTime.getDate() === date) {
        if (readingHour === hour) {
          sum += reading.value;
        } else {
          const time = new Date(today.setHours(hour, 00, 00))
          result.push({ time, sum: parseFloat(sum.toFixed(2)) });
          sum = reading.value;
          hour = readingHour;
        }
        if (index === readings.length - 1) {
          const time = new Date(today.setHours(hour, 00, 00))
          result.push({ time, sum: parseFloat(sum.toFixed(2)) })
        }
      }
    });
    if (result.length > 0) {

      while (result.length < 24) {
        const oldDate = result[result.length - 1].time;
        const hour = oldDate.getHours() + 1;
        const date = new Date(oldDate.setHours(hour, 00, 00));
        result.push({ time: date, sum: 0 });
      };
    };
    return result;
  },

  weekBar(readings) {
    const today = new Date();
    const startWeekday = today.getDay();
    const startDay = new Date(today.setDate(today.getDate() - startWeekday))
    let currentdate = startDay;
    let sum = 0;
    const result = [];
    readings.forEach((reading, index) => {
      const readingTime = reading.time;
      const readingDate = readingTime.getDate();

      if (readingTime.getDate() > startDay.getDate() - 1) {
        if (readingDate === currentdate.getDate()) {
          sum += reading.value;
        } else {
          let time = new Date(currentdate);
          time = new Date(time.setHours(00, 00, 00));
          result.push({ time, sum: parseFloat(sum.toFixed(2)) });
          sum = reading.value;
          currentdate = readingTime;
        }
        if (index === readings.length - 1) {
          let time = new Date(currentdate);
          time = new Date(time.setHours(00, 00, 00));
          result.push({ time, sum: parseFloat(sum.toFixed(2)) });
        }
      }
      return;
    })
    const data = this.NonRollPeriod(result, 7);
    return data;
  },

  monthBar(readings) {
    const today = new Date();
    const month = today.getMonth();
    let startDay = new Date()
    let currentdate = new Date(startDay.setDate(1));
    let sum = 0;
    const result = [];

    readings.forEach((reading, index) => {
      const readingDate = reading.time;
      const readingDay = readingDate.getDate()
      if (readingDate.getMonth() === month) {
        if (readingDay === currentdate.getDate()) {

          sum += reading.value;
        } else {
          let time = new Date(currentdate);
          time = new Date(time.setHours(00, 00, 00));
          result.push({ time, sum: parseFloat(sum.toFixed(2)) });
          sum = reading.value;
          currentdate = reading.time;
        }
      }
      if (index === readings.length - 1) {
        let time = new Date(currentdate);
        time = new Date(time.setHours(00, 00, 00));
        result.push({ time, sum: parseFloat(sum.toFixed(2)) });
      }
    })

    const year = today.getFullYear();
    const monthLength = new Date(year, month + 1, 0).getDate()
    const data = this.NonRollPeriod(result, monthLength);
    return data;
  },

  yearBar(readings) {
    const today = new Date();
    const year = today.getFullYear();
    let result = [];
    let currentdate = new Date(year, 00, 01);

    let month = 0;
    let sum = 0
    const firstReading = readings[0].time;
    let checkMonth = firstReading.getMonth();
    while (checkMonth > month && firstReading.getFullYear() === year) {
      let time = new Date(year, month, 01);
      time = new Date(time.setHours(00, 00, 00));
      result.push({ time, sum: 0 });
      month++;
    }

    readings.forEach((reading, index) => {
      const readingTime = reading.time;
      if (readingTime.getFullYear() === year) {
        if (readingTime.getMonth() === month) {
          sum += reading.value;
        } else {
          let time = new Date(year, month, 01);
          time = new Date(time.setHours(00, 00, 00));
          result.push({ time, sum: parseFloat(sum.toFixed(2)) });
          sum = reading.value;
          currentdate = reading.time;
          month = currentdate.getMonth();
        };

        if (index === readings.length - 1) {
          let time = new Date(year, month, 01);
          time = new Date(time.setHours(00, 00, 00));
          result.push({ time, sum: parseFloat(sum.toFixed(2)) });
        };
      };
    });
    while (result.length < 12) {
      const oldDate = result[result.length - 1].time;
      const oldMonth = oldDate.getMonth() + 1;
      let date = new Date();
      date = new Date(year, oldMonth, 01)
      date = new Date(date.setHours(00, 00, 00));
      result.push({ time: date, sum: 0 });
    }
    return result;
  },

  NonRollPeriod(readings, period) {
    while (readings.length < period) {
      const oldDate = readings[readings.length - 1].time;
      const oldDay = oldDate.getDate() + 1;
      let date = new Date();
      date = new Date(date.setDate(oldDay))
      date = new Date(date.setHours(00, 00, 00));
      readings.push({ time: date, sum: 0 });
    };
    return readings;
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
          readingResult = (chart === 'bar') ? this.dayBar(readings[index].sensor) : this.dayLine(readings[index].sensor);
          break;
        case 7:
          readingResult = (chart === 'bar') ? this.week(readings[index].sensor) : this.weekLine(readings[index].sensor, chart);
          break;
        case 30:
          readingResult = (chart === 'bar') ? this.month(readings[index].sensor) : this.monthLine(readings[index].sensor, chart);
          break;
        case 365:
          readingResult = (chart === 'bar') ? this.year(readings[index].sensor) : this.yearLine(readings[index].sensor, chart);
          break;
        default:
          readingResult = (chart === 'bar') ? this.dayBar(readings[index].sensor) : this.dayLine(readings[index].sensor);
          break;
      };
      extra = extraChart === "gust" ? this.getGusts(readings[index].sensor, period) : null;
      return readingResult;
    });
    const matchReading = this.matchDates(result, extra)
    return matchReading
  },

  matchDates(readings, extra) {
    let sensor1 = readings[0];
    let sensor2 = readings[1];

    let result = sensor1.map((item, index) => Object.assign({}, item, sensor2[index]));
  let  resultExtra = null
    if (extra){
      resultExtra = result.map((item, index) => Object.assign({}, item, extra[index]));
    };
    return (resultExtra) ? resultExtra : result;
  },

  getGusts(readings, period) {
    const today = new Date();
    const startDate = today.getDate() - period;
    let currentDate;
    const result = [];
    let max = 0;
    readings.forEach((reading, index) => {
      const readingTime = reading.time;
      const readingDate = readingTime.getDate();
      const readingHour = readingTime.getHours();

      if (readingDate > startDate) {
        currentDate = (!currentDate) ? readingTime : currentDate;
        if (readingHour === currentDate.getHours()) {
          if (max < reading.value) {
            max = reading.value;
          }
        } else {
          let time = new Date(currentDate);
          let hour = time.getHours();
          time = new Date(time.setHours(hour, 00, 00));
          result.push({ time, gust: parseFloat(max.toFixed(2)) });
          max = 0;
          currentDate = readingTime;
        }
        if (index === readings.length - 1) {
          let time = new Date(currentDate);
          let hour = time.getHours();
          time = new Date(time.setHours(hour, 00, 00));
          result.push({ time, gust: parseFloat(max.toFixed(2)) });
        };
      };
    });
    return result;
  },
};