
exports.up = function (knex) {
  return knex.schema.createTable("properties", t => {
    t.bigIncrements('id');
    t.string('name');
    t.string('type');
    t.text('description');
    t.string('url');
    t.float('min');
    t.float('max');
    t.string('unit');
    t.string('location');
    t.integer('device_id');
    t.foreign('device_id').references('devices.id');
    t.boolean("active").defaultTo('true');
    t.timestamp('createdAt').defaultTo(knex.fn.now());
  })
};

exports.down = function (knex) {
return knex.schema.dropTable('properties');
};

