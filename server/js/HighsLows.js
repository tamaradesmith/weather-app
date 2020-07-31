module.exports = {
  getHighLowsWeek(readings, period) {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const today = new Date();
    const startWeekday = today.getDay();
    const startDateTime = new Date(today.setDate(today.getDate() - startWeekday))
    const startDate = startDateTime.getDate()
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
  getHighLowsMonth(readings, period) {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const today = new Date();
    const month = today.getMonth();
    let startDateTime = new Date(today.setDate(1))
    startDateTime = new Date(startDateTime.setHours(00, 00, 00))

    let currentDate;
    const result = []
    let max = [];
    let min = [];

    readings.forEach((reading, index) => {
      const readingTime = reading.time;
      const readingDate = readingTime.getDate();
      if (readingTime.getMonth() >= month) {
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
  getHighLowsYear(readings) {
    const today = new Date();
    const year = today.getFullYear;
    let month = 0;
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    let currentDate;
    const result = [];
    let max = [];
    let min = [];

    while ((readings[0].time).getFullYear() < year) {
      readings.shift()
    };

    while (month < (readings[0].time).getMonth()) {
      let time = new Date();
      time = new Date(time.setMonth(month, 00, 00, 00, 00));
      result.push({ time, value: null, min: null });
      month++;
    }

    readings.forEach((reading, index) => {
      const readingTime = reading.time;
      const readingMonth = readingTime.getMonth();
      if (readingMonth === month) {
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
        month = readingTime.getMonth();
        currentDate = readingTime;
      };
      if (index === readings.length - 1) {
        const avg = min.reduce(reducer) / min.length;
        const avgMax = max.reduce(reducer) / max.length;
        let time = new Date(currentDate);
        time = new Date(time.setDate(1))
        time = new Date(time.setHours(00, 00, 00));
        result.push({
          time, value: parseFloat(avgMax.toFixed(2)), min: parseFloat(avg.toFixed(2))
        });
      };
    })
    while (result.length < 12) {
      let time = result[result.length - 1].time;
      const newMonth = time.getMonth() + 1
      time = new Date(time.setMonth(newMonth));
      time = new Date(time.setHours(00, 00, 00))
      result.push({ time, value: null, min: null });
    };
    return result;
  },


  // avgWindWeek(readings, period) {
  //   const today = new Date();
  //   const startWeekday = today.getDay();
  //   const startDateTime = new Date(today.setDate(today.getDate() - startWeekday));
  //   const startDate = startDateTime.getDate();
  //   let currentDate;
  //   const result = [];
  //   let sum = 0;
  //   let count = 0;
  //   readings.forEach((reading, index) => {
  //     const readingTime = reading.time;
  //     const readingDate = readingTime.getDate();
  //     if (readingDate >= startDate) {
  //       currentDate = (!currentDate) ? readingTime : currentDate;
  //       if (readingDate === currentDate.getDate()) {
  //         sum = reading.value;
  //         count++

  //       } else {
  //         const avg = sum / count;
  //         let time = new Date(currentDate);
  //         time = new Date(time.setHours(00, 00, 00));
  //         result.push({
  //           time, value: parseFloat(sum.toFixed(2))
  //         });
  //         sum = reading.value;
  //         count = 1
  //         currentDate = readingTime;
  //       }
  //       if (index === readings.length - 1) {
  //         const avg = sum / count;
  //         let time = new Date(currentDate);
  //         time = new Date(time.setHours(00, 00, 00));
  //         result.push({
  //           time, value: parseFloat(sum.toFixed(2))
  //         });
  //       }
  //     }
  //   });

  //   while (result.length < period) {
  //     const oldDate = result[result.length - 1].time;
  //     const date = oldDate.getDate() + 1;
  //     let time = new Date();
  //     time = new Date(time.setDate(date))
  //     time = new Date(time.setHours(00, 00, 00))
  //     result.push({ time, value: null });
  //   }
  //   console.log("avgWindWeek -> result", result);
  //   return result;
  // },



  // roll chart 
  // dayLine(readings) {
  //   let currentDay = new Date()
  //   currentDay = new Date(currentDay.setDate(currentDay.getDate() - 1))
  //   currentDay = new Date(currentDay.setMinutes(00, 00));
  //   let day, hour, sum;

  //   const result = [];
  //   let count = 1;

  //   readings.forEach((reading, index) => {
  //     const readingTime = reading.time;
  //     const readingHour = readingTime.getHours();
  //     if (readingTime > currentDay) {
  //       hour = (!hour) ? readingHour : hour;
  //       day = (!day) ? readingTime : day;
  //       sum = (!sum) ? reading.value : sum;
  //       if (readingHour === hour) {
  //         sum += reading.value;
  //         count++;
  //       } else {
  //         const time = new Date(day.setHours(hour, 00, 00));
  //         const value = sum / (count + 1)
  //         result.push({ time, value: parseFloat(value.toFixed(2)) });
  //         sum = reading.value;
  //         hour = readingHour;
  //         day = readingTime;
  //         count = 1;
  //       }
  //       if (index === readings.length - 1) {
  //         const time = new Date(day.setHours(hour, 00, 00))
  //         result.push({ time, value: parseFloat(sum.toFixed(2)) })
  //       };
  //     };
  //   });
  //   while (result.length < 24) {
  //     const oldDate = result[result.length - 1].time;
  //     const hour = oldDate.getHours() + 1;
  //     let time = new Date();
  //     date = new Date(time.setHours(hour, 00, 00))
  //     result.push({ time, value: "" });
  //   }
  //   return result;
  // },
};