const HighsLows = require('./HighsLows');

module.exports = {
  // just current day (avg hourly temperature)
  dayLine(readings) {
    let currentDay = new Date()
    const today = currentDay.getDate();
    currentDay = new Date(currentDay.setMinutes(00, 00));
    let day, hour, sum;

    const result = [];
    let count = 1;

    readings.forEach((reading, index) => {
      const readingTime = reading.time;
      const readingHour = readingTime.getHours();
      if (readingTime.getDate() === today) {
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
          const value = sum / (count + 1)
          const time = new Date(day.setHours(hour, 00, 00))
          result.push({ time, value: parseFloat(value.toFixed(2)) })
        };
      };
    });
    while (result.length < 24 && result.length !== 0) {
      const oldDate = result[result.length - 1].time;
      const hour = oldDate.getHours() + 1;
      let time = new Date();
      time = new Date(time.setHours(hour, 00, 00))
      result.push({ time, value: null });
    }
    return result;
  },

  weekLine(readings, chart) {
    let data
    try {
      data = (chart.formate) ? HighsLows.getHighLowsWeek(readings, 7) : HighsLows.avgWindWeek(readings, 7);
    } catch (error) {
      console.log("weekLine -> error", error.message);
    }
    return data;
  },

  monthLine(readings, chart) {
    let data
    try {
      data = (chart.formate) ? HighsLows.getHighLowsMonth(readings, 30) : readings;
    } catch (error) {
      console.log("MonthLine -> error", error);
    }
    return data;
  },

  yearLine(readings, chart) {
    let data
    try {
      data = (chart.formate) ? HighsLows.getHighLowsYear(readings) : null;
    } catch (error) {
      console.log("MonthLine -> error", error.message);
    }
    return data;
  },



}