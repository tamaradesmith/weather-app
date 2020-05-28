const knex = require("../../client");
const axios = require('axios');

const DeviceQuery = require('./deviceQuery')
const SensorQuery = require('./sensorQuery');
const ControllerQuery = require('./controllerQuery');
const PropertyQuery = require('./propertyQuery');

module.exports = {
  // CRUD
  async create(info) {
    const nodeinfo = await knex(`nodes`).insert([
      info
    ]).returning("*");
    return nodeinfo[0];
  },
  async update(type, info, id) {
    const item = await knex(`${type}`).where({ id: id }).update(info).returning('name');
    return item;
  },
  async getNodes() {
    const nodes = await knex("nodes").select("*")
    return nodes;
  },
  async getNodeById(id) {
    const node = await knex("nodes").select("*").where({ id });
    return node[0]
  },


  //  SPECIAL CREATE
  async saveDevice(devices, nodeId) {
    await Promise.all(devices.map(async device => {
      const deviceObject = { name: device.name, description: device.description, type: device.type, node_id: nodeId }
      const deviceinfo = await DeviceQuery.create(deviceObject);

      device.sensors.forEach(async sensor => {
        sensor.device_id = deviceinfo[0]
        const result = await SensorQuery.create(sensor);
        return result;
      })

      device.controllers.forEach(async controller => {
        controller.device_id = deviceinfo[0];
        const result = await ControllerQuery.create(controller);
        return result;
      })
      return deviceinfo;
    }))
  },

  // UPDATE ACTIVE

  async updateActive(node) {
    const result = await knex('nodes').where({ id: node.id }).update({ active: node.active }).returning('id');
    let devices
      devices = await DeviceQuery.activeByNodeID(result[0], node.active);
    return { node: result[0], devices };
  },

  // SPECIAL QUERIES
  async getNodesBySite(site) {
    const nodes = await knex('nodes').select("*").where({ site });
    return nodes;
  },
  async getNodesLocations() {
    const location = await knex.distinct().from("nodes").pluck("location").where({ active: true });
    return location;
  },

  // async getExisting(type) {
  //   const list = await knex(`${type}`).select("name", `${description}`, "id");
  //   return list;
  // },

  // async getItemInfo(type, id) {
  //   const item = await knex(`${type}`).select("*").where({ id: id });
  //   return item[0];
  // },

  // CHECK IF ALL READ IN DATABASE
  async nodeExist(node) {
    // let result = await knex("nodes").select("id").where({ name: node.name }).catch(error =>{})
    // if (result.length === 0) {
    const newNode = await knex("nodes").insert(node).returning('id').catch(error => { });
    return { value: false, id: newNode[0] };
    // } else {
    //   return { value: true, id: result[0].id };
    // };
  },

  async getDeviceListOnNode(id) {
    const ip = await knex("nodes").select("ipaddress").where({ id: id });
    const deviceXML = await axios.get(`http://${ip[0].ipaddress}/devicelist.xml`
    )
      .catch(err => {
        console.log(err.message)
      });
    return deviceXML.data;
  },

  async getAllNodeDependent(id) {
    const node = await this.getNodeById(id);
    const devices = await DeviceQuery.getAllDeviceDependentByNodeId(id);
    node.devices = devices;
    return node;
  },
};
