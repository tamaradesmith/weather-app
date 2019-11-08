
exports.seed = function(knex) {
  return knex('nodes').del()
    .then(function () {
      return knex('nodes').insert([
        { name: 'garden', ipaddress: '192.168.1.201', description: "Decorative garden node with light and water features", type: "huzzah"},
      ]);
    });
};
