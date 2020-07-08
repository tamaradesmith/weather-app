
module.exports = {
  formateReadings(period, readings) {
    let result;
    switch (parseInt(period)) {
      case 1:
        result = this.day(readings);
        break;
      case 7:
        console.log("meow")
        result = this.week(readings);
        break;
      // case 30:
      //    result = this.month(readings);
      //   console.log('month')
      //   break;
      // case 365:
      //   console.log('year');
      //   break;
      default:
        console.log('other')
        break;
    }
    return result;

  },
  day(readings) {
    const startDate = new Date(readings[0].time);
    readings.shift();
    let day = startDate.getDay();
    let hour = startDate.getHours();
    let sum = 0;
    const result = [];
    readings.map(reading => {
      const readingDate = new Date(reading.time);
      if (readingDate.getHours() === hour && readingDate.getDay() === day) {
        sum = + reading.value;
      } else {
        readingDate.setMinutes(00)
        readingDate.setSeconds(00);
        result.push({ time: readingDate, value: parseFloat(sum.toFixed(2)) });
        sum = reading.value;
        hour = readingDate.getHours();
        day = readingDate.getDay();
      }
      return
    })
    return result
  },

  week(readings) {
    const result = [];
    let sum = 0;
    readings.forEach(reading => {
      const weekday = new Date(readings[0].time);
      if (week < 6) {
        sum += reading.value;
      } else {
sum += reading.value;

      }
    })
  },




  // month(readings) {
  //   const startDate = new Date(readings[0].time);
  //   readings.shift();
  //   let month = startDate.getDay();
  //   // let hour = startDate.getHours();
  //   let sum = 0;
  //   const result = [];
  // }
}