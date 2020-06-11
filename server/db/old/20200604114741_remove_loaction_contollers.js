
exports.up = function(knex) {
  return knex.schema.alterTable('controllers', t => {
    t.dropColumn('location');
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('controllers', t => {
    t.text('location');
  });
};
