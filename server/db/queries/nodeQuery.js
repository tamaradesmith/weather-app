const knex = require('../../client');

module.exports = {
  async getNodes() {
    const nodes = await knex('nodes').select("*").where({active: true})
    return nodes;
  },
  async getNodesLocations() {
    const location = await knex.distinct().from('nodes').pluck("location");
    return location;
  },
  async create(type, info){
    const nodeinfo = knex(`${type}s`).insert([ 
    info
    ]).returning("name")
    return nodeinfo;
  },
  async getExisting(type){
    const list = await knex(`${type}`).select("name", "description", "id").where({active: true});
    return list;
  }
}
