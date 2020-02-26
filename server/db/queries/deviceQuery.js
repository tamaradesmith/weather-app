const knex = require('../../client');

module.exports = {
  async getDevices() {
    const devices = await knex("devices").select("*").where({ active: true });
    return devices;
  },
  async getDeviceByNodeId(id) {
    const devices = await knex('devices').select("*").where({ node_id: id });
    return devices
  },
  async getAllSensorsByDeviceId(id) {
    const sensors = await knex('sensors').select("*").where({ device_id: id });
    return sensors
  },
  async getAllControllersByDeviceId(id) {
    return await knex('controllers').select("*").where({ device_id: id });
  },
  async getAllDeviceDependentByNodeId(nodeId) {
    const devices = await this.getDeviceByNodeId(nodeId);
    await Promise.all(devices.map(async (device) => {
      sensors = await this.getAllSensorsByDeviceId(device.id);
      device.sensors = sensors;
      controllers = await this.getAllControllersByDeviceId(device.id);
      device.controllers = controllers;
      return device
    })
    )
    return devices
  }
}