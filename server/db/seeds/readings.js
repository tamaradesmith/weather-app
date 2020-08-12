
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('readings').del()
    .then(function () {
      const result = [];
      for (let i = 0; i < 5000; i++) {
        let dt = new Date();
        let rt = new Date();

        rt.setHours(rt.getHours() - 1 * i);

        dt.setMinutes(dt.getMinutes() - 30 * i);
        const rainValue = (Math.random() * 4 < 1.2) ? Math.random() * 5 : 0
        const rain = { sensor_id: 34, value: rainValue, time: rt }
        const temperature = { sensor_id: 27, value: Math.random() * 35, time: dt }
        const temperature2 = { sensor_id: 20, value: Math.random() * 5 + 17, time: dt }
        // const windD = { sensor_id: 38, value: Math.random() * 360, time: dt }
        // const windS = { sensor_id: 37, value: Math.random() * 40, time: dt }
        result.push(rain)
        result.push(temperature)
        result.push(temperature2)
        // result.push(windD)
        // result.push(windS)


      }
      return knex('readings').insert(
        result
      );
    });
};