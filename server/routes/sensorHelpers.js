const e = require("express");

module.exports = {
  formateReadings(period, readings) {
    let result;
    switch (parseInt(period)) {
      case 1:
        result = this.day(readings);
        break;
      case 7:
        result = this.week(readings);
        break;
      case 30:
        result = this.month(readings);
        break;
      case 365:
        result = this.year(readings);
        break;
      default:
        result = this.day(readings);
        break;
    };
    return result;
  },

  day(readings) {
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
          result.push({ time, value: reading.value, });
          sum = reading.value;
          hour = readingHour;
        }
        if (index === readings.length - 1) {
          const time = new Date(today.setHours(hour, 00, 00))
          result.push({ time, value: parseFloat(sum.toFixed(2)) })
        }
      }
    });
    while (result.length < 24) {
      const oldDate = result[result.length - 1].time;
      const hour = oldDate.getHours() + 1;
      const date = new Date(oldDate.setHours(hour, 00, 00));
      result.push({ time: date, value: 0 });
    };
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
    console.log("week -> result", result);

    const data = this.NonRollPeriod(result, 7);
    return data;
  },



  month(readings) {
    const today = new Date();
    const month = today.getMonth();
    let startDay = new Date()
    let currentdate = new Date(startDay.setDate(1));
    console.log("month -> currentdate", currentdate);
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
    console.log("year -> year", year);
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
          console.log("year -> result", result);
          sum = reading.value;
          currentdate = reading.time;
          month = currentdate.getMonth();
        };

        if (index === readings.length -1) {
          let time = new Date(year, month, 01);
          time = new Date(time.setHours(00, 00, 00));
          result.push({ time, value: parseFloat(sum.toFixed(2)) });
        }
      };

    })
    while (result.length < 12){
      const oldDate = result[result.length - 1].time;
      const oldMonth = oldDate.getMonth() + 1;
      let date = new Date();
      date = new Date(year, oldMonth, 01)
      date = new Date(date.setHours(00, 00, 00));
      result.push({ time: date, value: 0 });
    }
    return result;
  },
  //   const result = [];
  //   const today = new Date();
  //   const year = today.getFullYear();
  //   let sum = readings[0].value;
  //   let month = readings[0].time.getMonth();
  //   readings.shift();
  //   if (month !== 0) {
  //     let i = 0
  //     while (i <= month) {
  //       let yearDate = new Date();
  //       yearDate.setMinutes(00);
  //       yearDate.setSeconds(00);
  //       yearDate.setHours(00);
  //       yearDate.setDate(1);
  //       yearDate.setMonth(i);
  //       yearDate.setDate(1);
  //       result.push({ value: 0, time: yearDate });
  //       i++;
  //     };
  //   };

  //   readings.forEach(reading => {
  //     const readingDate = reading.time;
  //     const readingMonth = readingDate.getMonth();
  //     const readingYear = readingDate.getFullYear();
  //     if (readingYear === year) {
  //       if (readingMonth === month) {
  //         sum += reading.value;
  //       } else {
  //         readingDate.setMinutes(00);
  //         readingDate.setSeconds(00);
  //         readingDate.setHours(00);
  //         readingDate.setDate(1);
  //         result.push({ time: readingDate, value: parseFloat(sum.toFixed(2)) });
  //         sum = reading.value;
  //         month = readingMonth;
  //       };
  //     };
  //     return;
  //   });
  //   while (result.length < 12) {
  //     const oldDate = result[result.length - 1].time;
  //     const oldMonth = oldDate.getMonth() + 1;
  //     let yearDate = new Date();
  //     yearDate.setMinutes(00);
  //     yearDate.setSeconds(00);
  //     yearDate.setHours(01);
  //     yearDate.setDate(1);
  //     yearDate.setMonth(oldMonth);;
  //     result.push({ value: 0, time: yearDate });
  //   };
  //   return result;
  // },

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

};