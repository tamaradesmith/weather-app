const knex = require("../../client");


module.exports = {
  async getSites(){
    return await knex('sites')
    .select("*")
    .join('display');
  },
  async getSiteByUser(user){
    return await knex('sites')
    .select("sites.name")
    .where("users.id", user)
    .join('users', 'users.site_id', 'sites.id')
  }
}
