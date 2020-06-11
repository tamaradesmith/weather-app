
exports.up = function(knex) {
  return knex.schema.createTable('property_properties', t => {
    t.bigIncrements('id');
    t.integer('property_id');
    t.foreign('property_id').references('sensors.id');
    t.string('name');
    t.string('value');
    t.timestamp('createdAt').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('property_properties');
};
