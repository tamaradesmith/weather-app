
exports.up = function(knex) {
  return knex.schema.alterTable("controllers", t => {
    t.string("url");
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable("controllers", t => {
    t.dropColumn("url");
  });
};
