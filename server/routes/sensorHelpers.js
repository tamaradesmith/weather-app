
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
    const startDate = new Date(readings[0].time);
    let sum = readings[0].value;
    let day = startDate.getDay();
    let hour = startDate.getHours();
    const result = [];
    readings.shift();

    readings.map(reading => {
      const readingDate = new Date(reading.time);
      if (readingDate.getHours() === hour && readingDate.getDay() === day) {
        sum = + reading.value;
      } else {
        readingDate.setMinutes(00);
        readingDate.setSeconds(00);
        result.push({ time: readingDate, value: parseFloat(sum.toFixed(2)) });
        sum = reading.value;
        hour = readingDate.getHours();
        day = readingDate.getDay();
      };
      return;
    });
    return result;
  },


  week(readings) {
    const start = new Date(readings[0].time);
    let day = start.getDay();
    let sum = readings[0].value;
    readings.shift();
    const startDay = start.getDay();
    const result = [];

    readings.forEach(reading => {
      const readingDate = new Date(reading.time);
      const currentDay = readingDate.getDay();
      if (currentDay <= startDay) {
        if (day === currentDay) {
          sum += reading.value;
        } else {
          readingDate.setMinutes(00);
          readingDate.setSeconds(00);
          readingDate.setHours(00);
          result.push({ time: readingDate, value: parseFloat(sum.toFixed(2)) });
          sum = reading.value;
          day = currentDay;
        };
      };
      return;
    });
    const data = this.NonRollPeriod(result, 7);
    return data;
  },



  month(readings) {
    const today = new Date();
    const month = today.getMonth();
    const start = new Date(readings[0].time);
    let day = start.getDate();
    let sum = readings[0].value;
    readings.shift();
    const result = [];

    readings.forEach((reading) => {
      const readingDate = reading.time;
      const readingDay = readingDate.getDate()
      if (readingDate.getMonth() === month) {
        if (readingDay === day) {
          sum += reading.value;
        } else {
          readingDate.setMinutes(00);
          readingDate.setSeconds(00);
          readingDate.setHours(00);
          result.push({ time: readingDate, value: parseFloat(sum.toFixed(2)) });
          sum = reading.value;
          day = readingDay;
        }
      } else {
        day = readingDay;
      };
      return;
    });

    const year = today.getFullYear();
    const monthLength = new Date(year, month + 1, 0).getDate()
    const data = this.NonRollPeriod(result, monthLength);
    return data;
  },

  year(readings) {
    const result = [];
    const today = new Date();
    const year = today.getFullYear();
    let sum = readings[0].value;
    let month = readings[0].time.getMonth();
    readings.shift();
    if (month !== 0) {
      let i = 0
      while (i <= month ) {
        let yearDate = new Date();
        yearDate.setMinutes(00);
        yearDate.setSeconds(00);
        yearDate.setHours(00);
        yearDate.setDate(1);
        yearDate.setMonth(i);
        yearDate.setDate(1);
        result.push({ value: 0, time: yearDate });
        i++;
      };
    };

    readings.forEach(reading => {
      const readingDate = reading.time;
      const readingMonth = readingDate.getMonth();
      const readingYear = readingDate.getFullYear();
      if (readingYear === year) {
        if (readingMonth === month) {
          sum += reading.value;
        } else {
          readingDate.setMinutes(00);
          readingDate.setSeconds(00);
          readingDate.setHours(00);
          readingDate.setDate(1);
          result.push({ time: readingDate, value: parseFloat(sum.toFixed(2)) });
          sum = reading.value;
          month = readingMonth;
        };
      };
      return;
    });
    while (result.length < 12) {
      const oldDate = result[result.length - 1].time;
      const oldMonth = oldDate.getMonth() + 1;
      let yearDate = new Date();
      yearDate.setMinutes(00);
      yearDate.setSeconds(00);
      yearDate.setHours(01);
      yearDate.setDate(1);
      yearDate.setMonth(oldMonth);;
      result.push({ value: 0, time: yearDate });
    };
    return result;
  },


  NonRollPeriod(readings, period) {

    while (readings.length < period) {
      const oldDate = readings[readings.length - 1].time;
      const oldDay = oldDate.getDate() + 1;
      const date = new Date();
      date.setDate(oldDay);
      readings.push({ time: date, value: 0 });
    };

    return readings;
  },
};