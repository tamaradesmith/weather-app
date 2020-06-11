
exports.up = function (knex) {
  return knex.schema.createTable('controllers', t => {
    t.bigIncrements('id');
    t.string('name');
    t.text('description');
    t.integer('type_id');
    t.foreign('type_id').references('controller_types.id');
    t.integer('device_id');
    t.boolean("active").defaultTo('true')
    t.foreign('device_id').references('devices.id');
    t.string("url");
    t.timestamp('createdAt').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('controllers');
};
