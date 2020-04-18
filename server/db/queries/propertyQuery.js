const knex = require('../../client');

module.exports = {
  async create(info){
    const property = await knex('properties').insert(info).returning("*");
    return property[0];
  },
}