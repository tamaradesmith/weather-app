
exports.up = function (knex) {
  return knex.schema.alterTable('sensors', t => {
    t.dropColumn('type');
    t.dropColumn('min');
    t.dropColumn('max');
    t.dropColumn('unit');
    t.integer('type_id');
    t.foreign('type_id').references('sensor_types.id');
  })
};

exports.down = function (knex) {
  return schema.alterTable('sensors', t => {
    t.string('type');
    t.float('max');
    t.float('min');
    t.string('unit');
    t.dropColumn('type_id');
  })
};
