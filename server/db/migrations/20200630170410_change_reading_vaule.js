
exports.up = function(knex) {
  return knex.schema.alterTable('readings', t=>{
    t.float('value').alter();
  })
};

exports.down = function(knex) {
  t.integer('value').alter();

};
