const knex = require("../../client");


module.exports = {
  async getSites(){
    return await knex('sites')
    .select("*")
    .join('display');
  },
}
