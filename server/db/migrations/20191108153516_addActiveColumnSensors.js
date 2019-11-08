
exports.up = function(knex) {
  return knex.schema.alterTable('sensors', t =>{
    t.boolean("active").defaultTo('true')
  })
};

exports.down = function(knex) {
  return knex.schema.alterTable('sensors', t => {
    table.dropColumn('active')
  })
};
