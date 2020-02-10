const knex = require('../../client');

module.exports = {
  async getTypeofControllers() {
    const types = await knex.distinct().from("controllers").pluck("type");
    console.log("TCL: getTypeofControllers -> types", types)
    return types;
  }
}