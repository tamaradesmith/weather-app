module.exports = {

  // WEEK
  
  avgWeek(readings, period) {
    const today = new Date();
    const startWeekday = today.getDay();
    const startDateTime = new Date(today.setDate(today.getDate() - startWeekday));
    const startDate = startDateTime.getDate();
    let currentDate;
    const result = [];
    let sum = 0;
    let count = 0;
    readings.forEach((reading, index) => {
      const readingTime = reading.time;
      const readingDate = readingTime.getDate();
      if (readingDate >= startDate) {
        currentDate = (!currentDate) ? readingTime : currentDate;
        if (readingDate === currentDate.getDate()) {
          sum = reading.value;
          count++
        } else {
          const avg = sum / count;
          let time = new Date(currentDate);
          time = new Date(time.setHours(00, 00, 00));
          result.push({
            time, value: parseFloat(sum.toFixed(2))
          });
          sum = reading.value;
          count = 1
          currentDate = readingTime;
        }
        if (index === readings.length - 1) {
          const avg = sum / count;
          let time = new Date(currentDate);
          time = new Date(time.setHours(00, 00, 00));
          result.push({
            time, value: parseFloat(sum.toFixed(2))
          });
        }
      }
    });

    while (result.length < period) {
      const oldDate = result[result.length - 1].time;
      const date = oldDate.getDate() + 1;
      let time = new Date();
      time = new Date(time.setDate(date))
      time = new Date(time.setHours(00, 00, 00))
      result.push({ time, value: null });
    }
    return result;
  },


  // MONTH

  avgMonth(readings, period) {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const today = new Date();
    const month = today.getMonth();
    let startDateTime = new Date(today.setDate(1))
    startDateTime = new Date(startDateTime.setHours(00, 00, 00))

    let currentDate;
    const result = []
    let max = [];


    readings.forEach((reading, index) => {
      const readingTime = reading.time;
      const readingDate = readingTime.getDate();
      if (readingTime.getMonth() >= month) {
        currentDate = (!currentDate) ? readingTime : currentDate;
        if (readingDate === currentDate.getDate()) {
   
          if (max.length < 5) {
            max.push(reading.value);
          } else if (Math.min(...max) < reading.value) {
            const indexMax = max.indexOf(Math.min(...max));
            max[indexMax] = reading.value;
            currentDate = readingTime;
          }
        } else {

          const avgMax = max.reduce(reducer) / max.length;
          let time = new Date(currentDate);
          time = new Date(time.setHours(00, 00, 00));
          result.push({
            time, value: parseFloat(readings[index-1].value.toFixed(2))
          });
          max = [];
          min = [];
          currentDate = readingTime;
        }
        if (index === readings.length - 1) {
          const avgMax = max.reduce(reducer) / max.length;
          let time = new Date(currentDate);
          time = new Date(time.setHours(00, 00, 00));
          result.push({
            time, value: parseFloat(reading.value.toFixed(2))
          });
        };
      };
    });
    const year = today.getFullYear();
    const monthLength = new Date(year, month + 1, 0).getDate();

    while (result.length < monthLength) {
      const oldDate = result[result.length - 1].time;
      const date = oldDate.getDate() + 1;
      let time = new Date();
      time = new Date(time.setDate(date));
      time = new Date(time.setHours(00, 00, 00));
      result.push({ time, value: null });
    }
    return result;
  },

}