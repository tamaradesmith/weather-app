
exports.up = function(knex) {
  return knex.schema.createTable('controllers', t=>{
    t.bigIncrements('id');
    t.string('name');
    t.string('type');
    t.text('propose');
    t.integer('device_id');
    t.boolean("active").defaultTo('true')
    t.foreign('device_id').references('devices.id');
    t.timestamp('createdAt').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('controllers')
};
