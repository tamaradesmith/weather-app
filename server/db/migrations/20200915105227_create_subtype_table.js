
exports.up = function(knex) {
  return knex.schema.createTable('sub_types', t => {
    t.bigIncrements('id');
    t.string('sub_type');
    t.timestamp('created_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('sub_types')
};
