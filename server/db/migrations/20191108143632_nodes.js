
exports.up = function(knex) {
  return knex.schema.createTable('nodes', t => {
    t.bigIncrements('id');
    t.string('name');
    t.text('description');
    t.string('type');
    t.string('ipaddress');
    t.boolean("active").defaultTo('true')
    t.timestamp("createdAt").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('nodes');
};
