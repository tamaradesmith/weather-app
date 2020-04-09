const knex = require("../../client");
const DeviceQuery = require('./deviceQuery')
const axios = require('axios');

module.exports = {
  // async searchForNodes() {
  //   const index = [];
  //   for (let i = 175; i <= 186; i++) {
  //     index.push(i);
  //   };
  //   let existingNodes = await Promise.all(index.map(number => {
  //     return new Promise(async (res, rej) => {
  //       try {
  //         const response = await this.search(number);
  //         res(response);
  //       } catch (error) {
  //         rej(error);
  //       };
  //     });
  //   }));
  //   const nodes = [];
  //   existingNodes.forEach(node => {
  //     if (node !== null) {
  //       nodes.push(node);
  //     };
  //   });
  //   if (nodes.length === 0) {
  //     nodes.push({ name: "no nodes found" })
  //   }
  //   return nodes;
  // // },
  // async search(index) {
  //   const node = await axios.get(`http://${BASE_IP}${index}/rest/node/name`)
  //     .catch(error => {
  //       return null;
  //     });
  //   if (node !== null) {
  //     const name = this.getValue(node.data);
  //     const nodeObject = { name: name, ip: `${BASE_IP}${index}` };
  //     await Promise.all(fields.map(field => {
  //       return new Promise(async (res, rej) => {
  //         try {
  //           const node = await axios.get(`http://${BASE_IP}${index}/rest/node/${field}`);
  //           const value = await this.getValue(node.data);
  //           nodeObject[field] = value;
  //           res(nodeObject);
  //         } catch (error) {
  //           rej(error);
  //         };
  //       });
  //     }));
  //     return nodeObject;
  //   } else {
  //     return null;
  //   };
  // },
  // getValue(data) {
  //   const start = data.indexOf("<value>");
  //   const end = data.indexOf("</value>");
  //   return data.substring(start + 7, end);
  // },

  // CRUD
  async create(info) {
    const nodeinfo = await knex(`nodes`).insert([
      info
    ]).returning("*");
    console.log("create -> nodeinfo", nodeinfo)
    return nodeinfo[0];
  },
  async update(type, info, id) {
    const item = await knex(`${type}`).where({ id: id }).update(info).returning('name');
    return item;
  },

  async saveDevice(devices, nodeId) {
    await Promise.all(devices.map(async device => {
      const deviceObject = { name: device.name, description: device.description, type: device.type, node_id: nodeId }
      const deviceinfo = await this.create('device', deviceObject);

      device.sensors.forEach(async sensor => {
        sensor.device_id = deviceinfo[0]
        const result = await this.create("sensor", sensor);
        return 'finish'
      })

      device.controllers.forEach(async controller => {
        controller.device_id = deviceinfo[0];
        const result = await this.create('controller', controller)
        return "finish"
      })
      return deviceinfo;
    }))
  },
  async updateActive(node) {
    const result = await knex('nodes').where({ id: node.id }).update({ active: node.active }).returning('id')
    return result[0];

  },
  async getNodeById(id) {
    const node = await knex("nodes").select("*").where({ id: id });
    return node[0]
  },
  async getNodes() {
    const nodes = await knex("nodes").select("*").where({ active: true })
    return nodes;
  },
  async getNodesLocations() {
    const location = await knex.distinct().from("nodes").pluck("location").where({ active: true });
    return location;
  },
  async getExisting(type) {
    const list = await knex(`${type}`).select("name", `${description}`, "id");
    return list;
  },
  async getItemInfo(type, id) {
    const item = await knex(`${type}`).select("*").where({ id: id });
    return item[0];
  },
  async nodeExist(node) {
    let result = await knex("nodes").select("id").where({ name: node.name }).catch(error =>{})
    if (result.length === 0) {
      const newNode = await knex("nodes").insert(node).returning('id').catch(error=> {});
      console.log("nodeExist -> newNode", newNode)
      return  { value: false, id: newNode[0] };
    } else {
      return { value: true, id: result[0].id };
    };
  },
  async getDeviceListOnNode(id) {
    const ip = await knex("nodes").select("ipaddress").where({ id: id });
    console.log("getDeviceListOnNode -> ip", ip)
    const deviceXML = await axios.get(`http://${ip[0].ipaddress}/devicelist.xml`
    )
    .catch(err => {
      console.log(err.message)
    });
    console.log("getDeviceListOnNode -> deviceXML", deviceXML)
    return deviceXML.data;
  },
  async getAllNodeDependent(id) {
    const node = await this.getNodeById(id);
    const devices = await DeviceQuery.getAllDeviceDependentByNodeId(id);
    console.log("TCL: getAllNodeDependent -> devices", devices)
    node.devices = devices;
    return node;
  },
};
