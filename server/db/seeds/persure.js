
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('readings').del()
    .then(function () {
      const result = [];
      for (let i = 0; i < 5000; i++) {
        var dt = new Date();
        const persure = { sensor_id: 28, value: Math.random() * 10 + 995, time: dt }
        result.push(persure)

      }
      return knex('readings').insert(
        result
      );
    });
};
