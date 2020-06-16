
exports.up = function(knex) {
  return knex.schema.createTable('users', t => {
    t.bigIncrements('id');
    t.string('username').unique();
    t.string('password').notNullable();
    t.integer('site_id');
    t.foreign('site_id').references('sites.id');
    t.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
