const knex = require('../../client');

module.exports ={
  async getDevices(){
    const devices = await knex("devices").select("*").where({active: true});
    return devices;
  }
}