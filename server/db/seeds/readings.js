
exports.seed = function (knex) {
  //   // Deletes ALL existing entries
  //   return knex('table_name').del()
  // .then(function () {
  const result = [];
  for (let i = 0; i < 5000; i++) {
    var dt = new Date();
    dt.setMinutes(dt.getMinutes() - 30 * i);
    const reading = { sensor_id: 34, value: Math.random() * 5, time: dt }
    result.push(reading)
    //  document.write(dt);
  }
  return knex('readings').insert(
    result
  );
  // });
};