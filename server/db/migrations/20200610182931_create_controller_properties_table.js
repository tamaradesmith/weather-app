
exports.up = function(knex) {
  return knex.schema.createTable('controller_properties', t =>{
    t.bigIncrements('id');
    t.integer('controller_id');
    t.foreign('controller_id').references('controllers.id');
    t.string('name');
    t.string('value');
    t.timestamp('createdAt').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('controller_properties');
};
