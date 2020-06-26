
exports.up = function(knex) {
  return knex.schema.alterTable('users', t =>{
    t.boolean("is_admin").defaultTo('false')
  })
};

exports.down = function(knex) {
  return knex.schema.alterTable('users', t =>{
    t.dropColumn('is_admin')
  })
};
