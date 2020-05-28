const knex = require('../../client');

module.exports = {
  // CRUD
  async create(info) {
    const controller = await knex("controllers").insert(info).returning("*");
    return controller[0];
  },

  // SPECIAL QUERIES

  async getAllControllersOnNodeByDevices(devices) {
    await Promise.all(devices.map(async device => {
      const controllers = await knex('controllers').select('*').where({ device_id: device.id });
      device.controllers = controllers;
      return;
    }));
    return devices;
  },

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
};