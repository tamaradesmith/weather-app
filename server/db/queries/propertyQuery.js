const knex = require('../../client');

module.exports = {
  async create(info){
    const property = await knex('properties').insert(info).returning("*");
    return property[0];
  },
  async getAllPropertiesOnNodeByDevice(devices){
    await Promise.all(devices.map(async device => {
      const properties = await knex('properties').select('*').where({device_id: device.id});
      device.properties = properties;
      return;
    }));
    return devices
  },
}