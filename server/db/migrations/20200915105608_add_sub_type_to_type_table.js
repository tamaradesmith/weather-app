
exports.up = function (knex) {
  return knex.schema.alterTable('sensors', t => {
    t.integer('sub_type_id');
    t.foreign('sub_type_id').references('sub_types.id')
  })
};

exports.down = function (knex) {
  return knex.schema.alterTable('sensors', t => {
    t.dropColumn('sub_type_id');
  })
};
