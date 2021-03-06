
exports.up = function(knex) {
  return knex.schema.createTable('sensors', t=>{
    t.bigIncrements('id');
    t.string('name');
    t.string('type');
    t.float('max');
    t.float('min');
    t.string('unit');
    t.text('description');
    t.string('location');
    t.integer('device_id');
    t.foreign('device_id').references('devices.id');
    t.boolean("active").defaultTo('true');
    t.timestamp('createdAt').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('sensors')
};
