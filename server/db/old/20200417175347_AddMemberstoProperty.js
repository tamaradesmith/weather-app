
exports.up = function (knex) {
  return knex.schema.alterTable('properties', t => {
    t.text('members');
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('properties', t => {
    t.dropColumn('members');
  });
};
