const knex = require("../../client");

module.exports = {
  async getNodes() {
    const nodes = await knex("nodes").select("*").where({active: true})
    return nodes;
  },
  async getNodesLocations() {
    const location = await knex.distinct().from("nodes").pluck("location").where({ active: true });
    return location;
  },
  async create(type, info){
    const nodeinfo = knex(`${type}s`).insert([ 
    info
    ]).returning("name")
    return nodeinfo;
  },
  async update(type, info, id){
    console.log("TCL: update -> info", info)
    const item = await knex(`${type}`).where({id: id}).update(info).returning('name');
    return item;
  },
  async getExisting(type){
    description  = (type === 'sensors' ||type === 'controller')? "propose" : "description"
    const list = await knex(`${type}`).select("name", `${description}`, "id");
    return list;
  },
  async getItemInfo(type, id){
    const item = await knex(`${type}`).select("*").where({id: id});
    return item[0];
  },
}
