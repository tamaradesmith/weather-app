module.exports ={
  getHighLows(readings, period) {
    const today = new Date();
    const startWeekday = today.getDay();
    const startDateTime = new Date(today.setDate(today.getDate() - startWeekday))
    const startDate = startDateTime.getDate()
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    let currentDate;
    const result = []
    let max = [];
    let min = [];
    readings.forEach((reading, index) => {
      const readingTime = reading.time;
      const readingDate = readingTime.getDate();
      if (readingDate >= startDate) {
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
        };
      };
    });
    while (result.length < 7) {
      const oldDate = result[result.length - 1].time;
      const date = oldDate.getDate() + 1;
      let time = new Date();
      time = new Date(time.setDate(date))
      time = new Date(time.setHours(00, 00, 00))
      result.push({ time, value: null });
    }
    return result;
  },
}