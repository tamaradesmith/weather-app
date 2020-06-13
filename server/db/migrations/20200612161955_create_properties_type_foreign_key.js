
exports.up = function (knex) {
  return knex.schema.alterTable("property_properties", t => {
    t.integer('property_id');
    t.foreign('property_id').references('properties.id');
  })
};

exports.down = function (knex) {
  return knex.schema.dropColumn('property_id');
};
