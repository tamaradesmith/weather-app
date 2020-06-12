const knex = require("../../client");

module.exports = {
  async getLocationsBySiteId(siteId){
    return await knex('locations').select('id', 'name').where({site_id: siteId})
  }
}