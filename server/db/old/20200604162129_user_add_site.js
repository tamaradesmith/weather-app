
exports.up = function(knex) {
  return knex.schema.alterTable('users', t => {
    t.string('site');
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('users', t => {
    t.dropColumn('site');
  });
};
