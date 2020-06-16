
exports.up = function(knex) {
  return knex.schema.createTable('displays', t =>{
    t.bigIncrements('id');
    t.timestamp('createdAt').defaultTo(knex.fn.now());

  })
};

exports.down = function(knex) {
  return knex.schema.dropTable(displays);
};
