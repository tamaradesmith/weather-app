const knex = require('../../client');

module.exports = {
  // async getTypeofControllers() {
  //   const types = await knex.distinct().from("controllers").pluck("type");
  //   console.log("TCL: getTypeofControllers -> types", types)
  //   return types;
  // },
  async create(info){
    const controller = await knex("controllers").insert(info).returning("*");
    return controller[0];
  }
}