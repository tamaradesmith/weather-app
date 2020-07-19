const e = require("express");

module.exports = {
  formateReadings(period, readings, properties) {
    const chart = {}
    properties.forEach(item => {
      chart[item.name] = item.value
    })
    if (readings.length === 0) {
      return readings;
    } else {
      if (readings) {
        let result;
        switch (parseInt(period)) {
          case 1:
            result = (chart.chart === 'bar') ? this.dayBar(readings) : this.dayLine(readings);
            break;
          case 7:
            result = (chart.chart === 'bar') ? this.week(readings) : this.weekLine(readings, chart);
            break;
          case 30:
            result = (chart.chart === 'bar') ? this.month(readings) : this.monthLine(readings, chart);
            break;
          case 365:
            result = (chart.chart === 'bar') ? this.year(readings) : this.yearLine(readings, chart);
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
          result.push({ time, value: parseFloat(sum.toFixed(2)) });
          sum = reading.value;
          hour = readingHour;
        }
        if (index === readings.length - 1) {
          const time = new Date(today.setHours(hour, 00, 00))
          result.push({ time, value: parseFloat(sum.toFixed(2)) })
        }
      }
    });
    if (result.length > 0) {

      while (result.length < 24) {
        const oldDate = result[result.length - 1].time;
        const hour = oldDate.getHours() + 1;
        const date = new Date(oldDate.setHours(hour, 00, 00));
        result.push({ time: date, value: 0 });
      };
    };
    return result;
  },

  dayLine(readings) {
    let currentDay = new Date()
    currentDay = new Date(currentDay.setDate(currentDay.getDate() - 1))
    currentDay = new Date(currentDay.setMinutes(00));
    let day //= readings[0].time
    let hour //= day.getHours();
    let sum //= readings[0].value;
    // readings.shift();
    const result = [];
    let count = 1;

    readings.forEach((reading, index) => {
      const readingTime = reading.time;
      const readingHour = readingTime.getHours();
      if (readingTime > currentDay) {
        hour = (!hour) ? readingHour : hour;
        day = (!day) ? readingTime : day;
        sum = (!sum) ? reading.value : sum;

        if (readingHour === hour) {
          sum += reading.value;
          count++;
        } else {
          const time = new Date(day.setHours(hour, 00, 00));
          const value = sum / (count + 1)
          result.push({ time, value: parseFloat(value.toFixed(2)) });
          sum = reading.value;
          hour = readingHour;
          day = readingTime;
          count = 1;
        }
        if (index === readings.length - 1) {
          const time = new Date(day.setHours(hour, 00, 00))
          result.push({ time, value: parseFloat(sum.toFixed(2)) })
        }
      }
    });
    return result;
  },

  week(readings) {
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
          result.push({ time, value: parseFloat(sum.toFixed(2)) });
          sum = reading.value;
          currentdate = readingTime;
        }
        if (index === readings.length - 1) {
          let time = new Date(currentdate);
          time = new Date(time.setHours(00, 00, 00));
          result.push({ time, value: parseFloat(sum.toFixed(2)) });
        }
      }
      return;
    })
    const data = this.NonRollPeriod(result, 7);
    return data;
  },

  weekLine(readings, chart) {
    let data
    try {
      data = (chart.formate) ? this.getHighLows(readings, 7) : null;
    } catch (error) {
      console.log("weekLine -> error", error.message);
    }
    return data;
  },

  month(readings) {
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
          result.push({ time, value: parseFloat(sum.toFixed(2)) });
          sum = reading.value;
          currentdate = reading.time;
        }
      }
      if (index === readings.length - 1) {
        let time = new Date(currentdate);
        time = new Date(time.setHours(00, 00, 00));
        result.push({ time, value: parseFloat(sum.toFixed(2)) });
      }
    })

    const year = today.getFullYear();
    const monthLength = new Date(year, month + 1, 0).getDate()
    const data = this.NonRollPeriod(result, monthLength);
    return data;
  },


  monthLine(readings, chart) {
    console.log('month')
    let data
    try {
      data = (chart.formate) ? this.getHighLows(readings, 30) : readings;
    } catch (error) {
      console.log("MonthLine -> error", error.message);
    }
    return data;
  },


  year(readings) {
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
      result.push({ time, value: 0 });
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
          result.push({ time, value: parseFloat(sum.toFixed(2)) });
          sum = reading.value;
          currentdate = reading.time;
          month = currentdate.getMonth();
        };

        if (index === readings.length - 1) {
          let time = new Date(year, month, 01);
          time = new Date(time.setHours(00, 00, 00));
          result.push({ time, value: parseFloat(sum.toFixed(2)) });
        }
      };

    })
    while (result.length < 12) {
      const oldDate = result[result.length - 1].time;
      const oldMonth = oldDate.getMonth() + 1;
      let date = new Date();
      date = new Date(year, oldMonth, 01)
      date = new Date(date.setHours(00, 00, 00));
      result.push({ time: date, value: 0 });
    }
    console.log("year -> result", result);
    return result;
  },

  yearLine(readings, chart) {
    let data
    try {
      data = (chart.formate) ? this.getHighLowsYear(readings) : null;
    } catch (error) {
      console.log("MonthLine -> error", error.message);
    }
    return data;
  },

  NonRollPeriod(readings, period) {
    while (readings.length < period) {
      const oldDate = readings[readings.length - 1].time;
      const oldDay = oldDate.getDate() + 1;
      let date = new Date();
      date = new Date(date.setDate(oldDay))
      date = new Date(date.setHours(00, 00, 00));
      readings.push({ time: date, value: 0 });
    };
    return readings;
  },

  getHighLows(readings, period) {
    console.log("getHighLows -> period", period);
    const today = new Date();
    const startDate = today.getDate() - period;
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    let currentDate;
    const result = []
    let max = [];
    let min = [];
    readings.forEach((reading, index) => {
      const readingTime = reading.time;
      const readingDate = readingTime.getDate()
      if (readingDate > startDate) {
        currentDate = (!currentDate) ? readingTime : currentDate;
        if (readingDate === currentDate.getDate()) {
          if (min.length < 5) {
            min.push(reading.value);
          } else if (Math.max(...min) < reading.value) {
            const indexMin = min.indexOf(Math.max(...min));
            min[indexMin] = reading.value;
            currentDate = readingTime;
          }
          if (max.length < 5) {
            max.push(reading.value);
          } else if (Math.min(...max) < reading.value) {
            const indexMax = max.indexOf(Math.min(...max));
            max[indexMax] = reading.value;
            currentDate = readingTime;
          }
        } else {
          const avgMax = max.reduce(reducer) / max.length;
          const avg = min.reduce(reducer) / min.length;
          let time = new Date(currentDate);
          time = new Date(time.setHours(00, 00, 00));
          result.push({
            time, value: parseFloat(avgMax.toFixed(2)), min: parseFloat(avg.toFixed(2))
          });
          max = [];
          min = [];
          currentDate = readingTime;
        }
        if (index === readings.length - 1) {
          const avg = min.reduce(reducer) / min.length;
          const avgMax = max.reduce(reducer) / max.length;
          let time = new Date(currentDate);
          time = new Date(time.setHours(00, 00, 00));
          result.push({
            time, value: parseFloat(avgMax.toFixed(2)), min: parseFloat(avg.toFixed(2))
          });
        }
      }
    })
    return result;
  },




  getHighLowsYear(readings) {
    console.log("getHighLowsYear -> readings", readings[0]);
    const today = new Date();
    const startMonth = today.getMonth() - 12;
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    let currentDate;
    const result = []
    let max = [];
    let min = [];
    readings.forEach((reading, index) => {
      const readingTime = reading.time;
      const readingMonth = readingTime.getMonth();
      if (readingMonth > startMonth) {
        currentDate = (!currentDate) ? readingTime : currentDate;
        if (readingMonth === currentDate.getMonth()) {
          if (min.length < 5) {
            min.push(reading.value);
          } else if (Math.max(...min) < reading.value) {
            const indexMin = min.indexOf(Math.max(...min));
            min[indexMin] = reading.value;
            currentDate = readingTime;
          }
          if (max.length < 5) {
            max.push(reading.value);
          } else if (Math.min(...max) < reading.value) {
            const indexMax = max.indexOf(Math.min(...max));
            max[indexMax] = reading.value;
            currentDate = readingTime;
          }
        } else {
          const avgMax = max.reduce(reducer) / max.length;
          const avg = min.reduce(reducer) / min.length;
          let time = new Date(currentDate);
          time = new Date(time.setDate(1))
          time = new Date(time.setHours(00, 00, 00));
          result.push({
            time, value: parseFloat(avgMax.toFixed(2)), min: parseFloat(avg.toFixed(2))
          });
          max = [];
          min = [];
          currentDate = readingTime;
        }
        if (index === readings.length - 1) {
          const avg = min.reduce(reducer) / min.length;
          const avgMax = max.reduce(reducer) / max.length;
          let time = new Date(currentDate);
          time = new Date(time.setDate(1))
          time = new Date(time.setHours(00, 00, 00));
          result.push({
            time, value: parseFloat(avgMax.toFixed(2)), min: parseFloat(avg.toFixed(2))
          });
        }
      }
    })
    console.log("getHighLowsYear -> result", result);
    return result;
  },
};