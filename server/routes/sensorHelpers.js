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
            result = (chart.chart === 'bar') ? this.month(readings) : readings;
            break;
          case 365:
            result = (chart.chart === 'bar') ? this.year(readings) : readings;
            break;
          default:
            result = (chart.chart === 'bar') ? this.dayBar(readings) : readings;
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
    let day = readings[0].time
    let hour = day.getHours();
    let sum = readings[0].value;
    readings.shift();
    const result = [];
    let count = 1;

    readings.forEach((reading, index) => {
      const readingTime = reading.time;
      const readingHour = readingTime.getHours();
      if (readingHour === hour) {
        sum += reading.value;
        count++;
      } else {
        const time = new Date(day.setHours(hour, 00, 00))
        result.push({ time, value: sum / (count + 1), });
        sum = reading.value;
        hour = readingHour;
        day = readingTime;
        count = 1;
      }
      if (index === readings.length - 1) {
        const time = new Date(day.setHours(hour, 00, 00))
        result.push({ time, value: parseFloat(sum.toFixed(2)) })
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
  
   data = (chart.formate) ? this.getHighLows(readings, 6) : null;
} catch (error) {
console.log("weekLine -> error", error.message);
  
}
    // const startDay = new Date(today.setDate(today.getDate() - startWeekday))
    // let currentdate = startDay;
    // let sum = 0;


    // readings.forEach((reading, index) => {
    //   const readingTime = reading.time;
    //   const readingDate = readingTime.getDate();

    //   if (readingTime.getDate() > startDay.getDate() - 1) {
    //     if (readingDate === currentdate.getDate()) {
    //       sum += reading.value;
    //     } else {
    //       let time = new Date(currentdate);
    //       time = new Date(time.setHours(00, 00, 00));
    //       result.push({ time, value: parseFloat(sum.toFixed(2)) });
    //       sum = reading.value;
    //       currentdate = readingTime;
    //     }
    //     if (index === readings.length - 1) {
    //       let time = new Date(currentdate);
    //       time = new Date(time.setHours(00, 00, 00));
    //       result.push({ time, value: parseFloat(sum.toFixed(2)) });
    //     }
    //   }
    //   return;
    // })
    // const data = this.NonRollPeriod(result, 7);
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


  year(readings) {
    const today = new Date();
    const year = today.getFullYear();
    let result = [];
    let currentdate = new Date(year, 00, 01);

    let month = 0;
    let sum = 0
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
    return result;
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
    const today = new Date();
    const startDate = today.getDate() - period;
    let date = today.getDate();
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    let currentDate = readings[0].time
    const resultMin = [];

    const resultMax = [];
    let max = [50,50,50,50,50];
    let min = [-25,-25,-25,-25,-25];
    readings.forEach(reading => {
      const readingTime = reading.time;
      const readingDate =readingTime.getDate()
      
      if (readingDate > startDate) {
        if (readingDate === date) {
          console.log("getHighLows -> Math.max(...min) < reading.value", Math.max(...min) < reading.value);
          if (Math.max(...min) < reading.value) {
            const index = min.indexOf(Math.max(...min));
            min[index] = reading.value;
            currentDate = readingTime;
          } else {
            console.log("getHighLows -> min", min);
           const avg =  min.reduce(reducer)/min.length;
           console.log("getHighLows -> avg", avg);
            let time = new Date(currentdate);
            time = new Date(time.setHours(00, 00, 00));
            resultMin.push({ time, value: parseFloat(avg.toFixed(2)) });
          }
        }
      }
      console.log("getHighLows -> resultMin", resultMin);
    })

    return result;
  },
};