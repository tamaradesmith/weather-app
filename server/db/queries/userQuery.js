const knex = require('../../client');

module.exports = {
  getOne(id) {
    return knex('users').where({ id: id })
  },
  async GetByUsername(username) {
    const user = await knex('users').where({ username: username })
    return user[0]
  },
  async create(user) {
    const savedUser = await knex('users').insert(user).returning('id');
    return savedUser[0];
  },

}