
exports.up = function(knex) {
  return knex.schema.createTable('sensor_properties' , t =>{
    t.bigIncrements('id');
    t.integer('sensor_id');
    t.foreign('sensor_id').references('sensors.id');
    t.string('name');
    t.string('value');
    t.timestamp('createdAt').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('sensor_properties');
};
