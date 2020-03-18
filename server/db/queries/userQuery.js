const knex = require('../../client');

module.exports = {
  getOne(id){
    return knex('users').where({id: id})
  },
 async GetOneByEmail(email){
   const user = await knex('users').where({email: email})
   console.log("GetOneByEmail -> user", user)
    return user[0]
  },
  async create(user){
    console.log("create -> user", user)
    const savedUser = await knex('users').insert(user).returning('id');
    console.log("create -> savedUser", savedUser)
    return savedUser[0];
  },
}