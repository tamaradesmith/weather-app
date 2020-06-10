
exports.up = function(knex) {
  return knex.schema.alterTable('controllers', t =>{
    t.dropColumn('type');
t.integer('type_id');
t.foreign('type_id').references('controller_types.id');    
  })
};

exports.down = function(knex) {
  return knex.schema.alterTable('controllers', t =>{
    t.string('type');
t.dropColumn('type_id')
  })
};
