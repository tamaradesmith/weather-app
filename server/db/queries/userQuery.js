const knex = require('../../client');

module.exports = {
  getOne(id) {
    return knex('users').where({ id: id })
  },
  async GetByUsername(username) {
    const user = await knex('users')
    .join('sites', 'site_id', 'sites.id')
    .where({ username: username })
    .select('users.*', 'sites.name as site')

    return user[0]
  },
  async create(user) {
    const savedUser = await knex('users').insert(user).returning('id');
    return savedUser[0];
  },
  async getDefaultUser(){
    const user = await knex('users').select('id').where({username: 'default'})
    return user[0].id
  }
}