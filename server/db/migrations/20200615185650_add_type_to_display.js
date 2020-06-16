
exports.up = function (knex) {
  return knex.schema.alterTable("displays", t => {
    t.string('type');
    t.integer('user_id');
    t.foreign('user_id').references('users.id');
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('displays', t => {
    t.dropColumn('type');
    t.dropColumn('site_id');
  });
};
