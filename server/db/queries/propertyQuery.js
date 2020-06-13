const knex = require('../../client');

module.exports = {

  // CRUD 

  async create(info) {
    const property = await knex('properties').insert(info).returning("*");
    return property[0];
  },

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
  // PROPERTY TYPE
  async getTypeId(type) {
    const typeId = await knex('property_types').select('id').where({ type: type });
    return typeId[0];
  },
  // PROPERTY_PROPERTY
  async createProperties(properties, propertyId) {
    const keys = Object.keys(properties);
    return await Promise.all(keys.map(async (key) => {
      if (properties[key] !== "none" || properties[key] !== " ") {
        return knex('property_properties').insert({ property_id: propertyId, name: key, value: properties[key] });
      };
      return;
    }));
  },
};