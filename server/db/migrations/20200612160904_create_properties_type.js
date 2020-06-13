
exports.up = function(knex) {
  return knex.schema.alterTable('property_properties', t =>{
    t.dropColumn("property_id")
  })
};

exports.down = function(knex) {
  return knex.schema.al("property_properties", t=> {
    t.integer('property_id');

  })
};
