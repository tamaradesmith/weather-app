
exports.up = function (knex) {
  return knex.schema.createTable('sensor_types', t => {
    t.bigIncrements('id');
    t.string('type')
    t.timestamp('createdAt').defaultTo(knex.fn.now());
  })
};

exports.down = function (knex) {
return knex.schema.dropTable('sensor_types');
};
