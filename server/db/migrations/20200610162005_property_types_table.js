
exports.up = function(knex) {
  return knex.schema.createTable('property_types', t =>{
    t.bigIncrements('id');
    t.float('min');
    t.float('max');
    t.string('unit');
    t.timestamp('createdAt').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('property_type');
};
