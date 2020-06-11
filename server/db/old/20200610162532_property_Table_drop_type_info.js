
exports.up = function(knex) {
  return knex.schema.alterTable('properties', t =>{
t.dropColumn('type')
    t.dropColumn('min');
    t.dropColumn('max');
    t.dropColumn('unit');
    t.string('type_id');
    t.foreign('type_id').references('property_types');
  })
};

exports.down = function(knex) {
  return knex.schema.alterTable('properties', t =>{
    t.string('type');
    t.float('min');
    t.float('max');
    t.string('unit');
  })
};
