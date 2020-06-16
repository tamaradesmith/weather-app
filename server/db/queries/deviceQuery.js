const knex = require('../../client');

const SensorQuery = require('./sensorQuery');
const ControllerQuery = require('./controllerQuery');
const PropertyQuery = require('./propertyQuery');

module.exports = {

  // CRUD
  async getDevices() {
    const devices = await knex("devices").select("*").where({ active: true });
    return devices;
  },
  async create(info) {
    const device = await knex("devices").insert([info]).returning('*');
    return device[0];
  },

  // // QUERY BY 
  async getDevicesByNodeId(id) {
    return await knex('devices').select("*").where({ node_id: id });;
  },

  async getAllSensorsByDeviceId(id) {
    return await knex('sensors')
      .select("sensors.id", 'sensors.name', 'sensors.description', 'sensors.active', 'sensor_types.type as type')
      .join('sensor_types', 'sensor_types.id', 'type_id')
      .where({ device_id: id });
  },
  async getAllControllersByDeviceId(id) {
    return await knex('controllers')
      .select("controllers.id", 'controllers.name', 'controllers.description', 'controllers.active', 'controller_types.type as type')
      .join('controller_types', 'controller_types.id', 'type_id')
      .where({ device_id: id });
  },
  async getAllPropertiesByDeviceId(id) {
    return await knex('properties')
      .select("properties.id", 'properties.name', 'properties.description', 'properties.active', 'property_types.type as type')
      .join('property_types', 'property_types.id', 'type_id')
      .where({ device_id: id });
  },
  async getAllDeviceDependentByNodeId(nodeId) {
    const devices = await this.getDevicesByNodeId(nodeId);
    await Promise.all(devices.map(async (device) => {
      sensors = await this.getAllSensorsByDeviceId(device.id);
      device.sensors = sensors;
      controllers = await this.getAllControllersByDeviceId(device.id);
      device.controllers = controllers;
      properties = await this.getAllControllersByDeviceId(device.id);
      device.properties = properties;
      return device;
    })
    )
    return devices;
  },
  // UPDATE ACTIVE
  async activeByNodeID(nodeId, activeState) {
    const devicesId = await knex("devices").where({ node_id: nodeId }).update({ active: activeState }).returning('id');
    const ids = await Promise.all(devicesId.map(async (id) => {
      const dependents = this.activeDeviceDepenedent(id, activeState);
      return dependents;
    }));
    return ids
  },
  async activeByDevicesId(devices) {
    return await Promise.all(devices.map(async device => {
      const deviceId = await knex("devices").where({ id: device.id }).update({ active: device.active }).returning('id');
      const dependents = await this.activeDeviceDepenedent(device.id, device.active);
      return { deviceId, dependents };
    }));
  },
  async activeDeviceDepenedent(id, activeState) {
    const sensors = await SensorQuery.activeByDeviceID(id, activeState)
    const controllers = await ControllerQuery.activeByDeviceID(id, activeState);
    const properties = await PropertyQuery.activeByDeviceID(id, activeState);
    return { device: id, dependents: { sensors, controllers, properties } }
  },
};