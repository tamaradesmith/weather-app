
exports.up = function (knex) {
  return knex.schema.alterTable('sensors', t => {
    t.dropColumn('location');
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('sensors', t => {
    t.text('location');
  });
};
