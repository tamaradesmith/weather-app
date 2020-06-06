
exports.up = function(knex) {
  return knex.schema.alterTable('properties', t => {
    t.dropColumn('location');
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('properties', t => {
    t.text('location');
  });
};
