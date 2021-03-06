
exports.up = function(knex) {
  return knex.schema.createTable("display_cells", t=>{
    t.bigIncrements('id');
    t.integer('display_id');
    t.foreign('display_id').references('displays.id'); 
    t.integer('sensor_id');
    t.foreign('sensor_id').references('sensors.id');
    t.string('cell_id');
    t.timestamp('createdAt').defaultTo(knex.fn.now());

  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('display_cells');

};
