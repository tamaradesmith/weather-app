
exports.up = function(knex) {
  return knex.schema.createTable('readings', t =>{
    t.bigIncrements('id');
    t.integer('sensor_id');
    t.foreign('sensor_id').references('sensors.id');
    t.integer('value');
    t.datetime('time');
    t.timestamp('createdAt').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('readings');
};
