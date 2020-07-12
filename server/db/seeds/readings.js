
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('readings').del()
    .then(function () {
      const result = [];
      for (let i = 0; i < 5000; i++) {
        var dt = new Date();
        dt.setMinutes(dt.getMinutes() - 30 * i);
        const rainValue = (Math.random() * 4 < 1.2) ? Math.random() * 5 : 0
        const rain = { sensor_id: 34, value: rainValue, time: dt }
        const temperature = { sensor_id: 27, value: Math.random() * 35, time: dt }
        const windD = { sensor_id: 38, value: Math.random() * 360, time: dt }
        const windS = { sensor_id: 37, value: Math.random() * 40, time: dt }
        // const persure = { sensor_id: 28, value: Math.random() * 10, time: dt }
        result.push(rain)
        result.push(temperature)
        result.push(windD)
        result.push(windS)
        // result.push(persure)


      }
      return knex('readings').insert(
        result
      );
    });
};