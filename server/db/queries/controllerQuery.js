const knex = require('../../client');

module.exports = {

  async create(info){
    const controller = await knex("controllers").insert(info).returning("*");
    return controller[0];
  },
  async getAllControllersOnNodeByDevices(devices){
    await Promise.all(devices.map(async device => {
      const controllers = await knex('controllers').select('*').where({ device_id: device.id });
      device.controllers = controllers;
      return;
    }));
    return devices;
  },
}