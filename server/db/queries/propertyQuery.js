const knex = require('../../client');

module.exports = {

  // CRUD 

  // async create(info) {
  //   const property = await knex('properties').insert(info).returning("*");
  //   return property[0];
  // },

  // // SPECIAL QUERIES 

  // async getAllPropertiesOnNodeByDevice(devices) {
  //   await Promise.all(devices.map(async device => {
  //     const properties = await knex('properties').select('*').where({ device_id: device.id });
  //     device.properties = properties;
  //     return;
  //   }));
  //   return devices
  // },

  // // UPDATE ACTIVE 

  // async activeByDeviceID(id, activeState) {
  //   return await knex('properties').where({ device_id: id }).update({ active: activeState }).returning('id');
  // },

  // async activeByPropertiesId(properties) {
  //   return await Promise.all(properties.map(async property => {
  //     const result = await knex('properties').where({ id: property.id }).update({ active: property.active }).returning('id');
  //     return result[0]
  //   }));
  // },
};