
exports.up = function(knex) {
  return knex.schema.createTable('settings', t => {
    t.bigIncrements('id');
    t.integer('controller_id');
    t.foreign('controller_id').references('controllers.id');
    t.integer('value');
    t.datetime('time');
    t.timestamp('createdAt').defaultTo(knex.fn.now());
  })
};

exports.down = function (knex) {
  return knex.schema.dropTable('settings');
};