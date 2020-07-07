
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('readings').del()
    .then(function () {
      const result = [];
      for (let i = 0; i < 5000; i++) {
        var dt = new Date();
        dt.setMinutes(dt.getMinutes() - 30 * i);
        const reading = { sensor_id: 34, value: Math.random() * 5, time: dt }
        const temperature = { sensor_id: 27, value: Math.random() * 35, time: dt }
        const windD = { sensor_id: 38, value: Math.random() * 360, time: dt }
        const windS = { sensor_id: 37, value: Math.random() * 40, time: dt }
        result.push(reading)
        result.push(temperature)
        result.push(windD)
        result.push(windS)
        //  document.write(dt);
      }
      return knex('readings').insert(
        result
      );
    });
};