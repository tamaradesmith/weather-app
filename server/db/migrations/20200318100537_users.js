
exports.up = function (knex) {
  return knex.schema.createTable('users', t => {
    t.bigIncrements('id');
    t.string('email').unique().notNullable();
    t.string('username').unique();
    t.string('password').notNullable();
    t.boolean('active').notNullable().defaultTo(true);
    t.timestamp('created_at').defaultTo(knex.fn.now());
  })
};

exports.down = function (knex) {
  return knex.schema.dropTable('users')
};
