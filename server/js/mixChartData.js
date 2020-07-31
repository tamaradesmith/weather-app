module.exports = {
  dayBar(readings) {
    const today = new Date();
    const date = today.getDate();
    let hour = 0;
    let sum = 0;
    let count = 0;
    const result = [];
    readings.forEach((reading, index) => {
      const readingTime = reading.time;
      const readingHour = readingTime.getHours();
      if (readingTime.getDate() === date) {
        if (readingHour === hour) {
          sum += reading.value;
          count++
        } else {
          const time = new Date(today.setHours(hour, 00, 00))
          const value = sum / count;
          result.push({ time, sum: parseFloat(value.toFixed(2)) });
          sum = reading.value;
          hour = readingHour;
          count = 1;
        }
        if (index === readings.length - 1) {
          const time = new Date(today.setHours(hour, 00, 00))
          const value = sum / count;
          result.push({ time, sum: parseFloat(value.toFixed(2)) })
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
    let count = 0;
    const result = [];
    readings.forEach((reading, index) => {
      const readingTime = reading.time;
      const readingDate = readingTime.getDate();

      if (readingTime.getDate() > startDay.getDate() - 1) {
        if (readingDate === currentdate.getDate()) {
          sum += reading.value;
          count++;
        } else {
          let time = new Date(currentdate);
          const value = sum / count;
          time = new Date(time.setHours(00, 00, 00));
          result.push({ time, sum: parseFloat(value.toFixed(2)) });
          sum = reading.value;
          currentdate = readingTime;
          count = 1;
        }
        if (index === readings.length - 1) {
          let time = new Date(currentdate);
          time = new Date(time.setHours(00, 00, 00));
          const value = sum / count
          result.push({ time, sum: parseFloat(value.toFixed(2)) });
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
    let count = 0;
    const result = [];

    readings.forEach((reading, index) => {
      const readingDate = reading.time;
      const readingDay = readingDate.getDate()
      if (readingDate.getMonth() === month) {
        if (readingDay === currentdate.getDate()) {
          sum += reading.value;
          count++
        } else {
          let time = new Date(currentdate);
          time = new Date(time.setHours(00, 00, 00));
          const value = sum / count;
          result.push({ time, sum: parseFloat(value.toFixed(2)) });
          sum = reading.value;
          count=1;
          currentdate = reading.time;
        }
      }
      if (index === readings.length - 1) {
        let time = new Date(currentdate);
        time = new Date(time.setHours(00, 00, 00));
        const value = sum / count;
        result.push({ time, sum: parseFloat(value.toFixed(2)) });
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
    let count = 0;
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
          count++;
        } else {
          let time = new Date(year, month, 01);
          time = new Date(time.setHours(00, 00, 00));
          const value = sum / count;
          result.push({ time, sum: parseFloat(value.toFixed(2)) });
          sum = reading.value;
          count = 1;
          currentdate = reading.time;
          month = currentdate.getMonth();
        };

        if (index === readings.length - 1) {
          let time = new Date(year, month, 01);
          time = new Date(time.setHours(00, 00, 00));
          const value = sum / count;
          result.push({ time, sum: parseFloat(value.toFixed(2)) });
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
}