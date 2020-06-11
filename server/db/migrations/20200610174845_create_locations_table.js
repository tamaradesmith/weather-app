
exports.up = function(knex) {
  return knex.schema.createTable('locations', t =>{
    t.bigIncrements('id');
    t.string('name');
    t.integer('site_id');
    t.foreign('site_id').references('sites.id');
    t.timestamp('createdAt').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("locations");
};
