
exports.up = function(knex) {
  return knex.schema.alterTable("sensors", t=>{
    t.string("url");
  })
};

exports.down = function(knex) {
  return knex.schema.alterTable("sensors", t =>{
    t.dropColumn("url");
  })
};
