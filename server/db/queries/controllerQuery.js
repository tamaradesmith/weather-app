const knex = require('../../client');

module.exports = {
  // CRUD
  async create(info) {
    const controller = await knex("controllers").insert(info).returning("*");
    return controller[0];
  },

  // // SPECIAL QUERIES

  // async getAllControllersOnNodeByDevices(devices) {
  //   await Promise.all(devices.map(async device => {
  //     const controllers = await knex('controllers').select('*').where({ device_id: device.id });
  //     device.controllers = controllers;
  //     return;
  //   }));
  //   return devices;
  // },

  // UPDATE ACTIVE

  async activeByDeviceID(id, activeState) {
    return await knex('controllers').where({ device_id: id }).update({ active: activeState }).returning('id');
  },
  async activeByControllersId(controllers) {
    return await Promise.all(controllers.map(async controller => {
      const result = await knex('controllers').where({ id: controller.id }).update({ active: controller.active }).returning('id');
      return result[0]; 
    }))
  },

  //  CONTROLLER TYPE
  async getTypeId(type) {
    return await knex('controller_types').select('id').where({ type });
  },

  // CONTROLLER PROPERTY
  async createProperties(properties, controllerId) {
    if (properties !== undefined) {
      const keys = Object.keys(properties);
      return await Promise.all(keys.map(async (key) => {
        return await knex('controller_properties').insert({ controller_id: controllerId, name: key, value: properties[key] });
      }));
    };
    return;
  },
};