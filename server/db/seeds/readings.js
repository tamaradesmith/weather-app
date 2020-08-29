
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('readings').del()
    .then(function () {
      const result = [];
      for (let i = 0; i < 1000; i++) {
        let dt = new Date();
        let rt = new Date();
        rt.setHours(rt.getHours() - 1 * i);
        dt.setMinutes(dt.getMinutes() - 30 * i);

        const rainValue = (Math.random() * 4 < 1.2) ? Math.random() * 5 : 0
        const rain = { sensor_id: 34, value: rainValue, time: rt }
        const temperature = { sensor_id: 27, value: Math.random() * 35, time: dt }
        const temperature2 = { sensor_id: 20, value: Math.random() * 5 + 17, time: dt }
        const windD = { sensor_id: 38, value: Math.random() * 360, time: dt }
        const windS = { sensor_id: 37, value: Math.random() * 40, time: dt }
        const humitiy = { sensor_id: 35, value: Math.random() * 100, time: dt }
        const humitiy2 = { sensor_id: 36, value: Math.random() * 85, time: dt }

        result.push(humitiy)
        result.push(humitiy2)
        result.push(rain)
        result.push(temperature)
        result.push(temperature2)
        result.push(windD)
        result.push(windS)
        if (i < 5) {
          const red = { sensor_id: 16, value: Math.round(Math.random() * 254), time: rt }
          const blue = { sensor_id: 17, value: Math.round(Math.random() * 254), time: rt }
          const green = { sensor_id: 18, value: Math.round(Math.random() * 254), time: rt }
          const bed = { sensor_id: 1, value: Math.random() * 4 + 18, time: rt }
          const co = { sensor_id: 23, value: Math.round(Math.random() * 200), time: rt }
          const part = { sensor_id: 24, value: Math.round(Math.random() * 200), time: rt }

          result.push(bed);
          result.push(co);
          result.push(part);

          result.push(red);
          result.push(green);
          result.push(blue);
        }

      }

      return knex('readings').insert(
        result
      );
    });
};