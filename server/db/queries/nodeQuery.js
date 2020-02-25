const knex = require("../../client");
const BASE_IP = '192.168.0.';
const axios = require('axios');
const fields = ['description', 'location', 'type'];

module.exports = {
  async searchForNodes() {
    const index = [];
    for (let i = 175; i <= 186; i++) {
      index.push(i);
    };
    let existingNodes = await Promise.all(index.map(number => {
      return new Promise(async (res, rej) => {
        try {
          const response = await this.search(number);
          console.log("TCL: searchForNodes -> response", response, number)
          res(response);
        } catch (error) {
          rej(error);
        };
      });
      
    }));
    const nodes = [];
    existingNodes.forEach(node => {
      if (node !== null) {
        nodes.push(node);
      };
    });
    return nodes;
  },
  async search(index) {
    const node = await axios.get(`http://${BASE_IP}${index}/rest/node/name`)
      .catch(error => {
        return null;
      });
    if (node !== null) {
      const name = this.getValue(node.data);
      const nodeObject = { name: name, ip: `${BASE_IP}${index}` };
    await Promise.all(fields.map(field => {
        return new Promise(async (res, rej) => {
          try {
            const node = await axios.get(`http://${BASE_IP}${index}/rest/node/${field}`);
            const value = await this.getValue(node.data);
            nodeObject[field] = value;
            res(nodeObject);
          } catch (error) {
            rej(error);
          };
        });
      }));
      return nodeObject;
    } else {
      return null;
    };
  },

  getValue(data) {
    const start = data.indexOf("<value>");
    const end = data.indexOf("</value>");
    return data.substring(start + 7, end);
  },
  // CRUD
  async create(type, info) {
    const nodeinfo = knex(`${type}s`).insert([
      info
    ]).returning("name");
    return nodeinfo;
  },
  async update(type, info, id) {
    const item = await knex(`${type}`).where({ id: id }).update(info).returning('name');
    return item;
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
    description = (type === 'sensors' || type === 'controller') ? "propose" : "description";
    const list = await knex(`${type}`).select("name", `${description}`, "id");
    return list;
  },
  async getItemInfo(type, id) {
    const item = await knex(`${type}`).select("*").where({ id: id });
    return item[0];
  },
  async nodeExist(node){
    let result = await knex("nodes").select("id").where({name: node.name})
    if (result.length === 0){
      result = await knex("nodes").insert(node).returning('id');
      return {value: false, id: result[0].id};
    } else {
      return {value: true, id: result[0].id};
    };
  },
  async getDevicesOnNode(id){
    const ip = await knex("nodes").select("ipaddress").where({id:id});
    const deviceXML = await axios.get(`devicelist.xml`).catch(err =>{
      console.log(err.message)
    });
    console.log("TCL: getDevicesOnNode -> deviceXML", deviceXML)

    // const deviceXML = await axios.get(`http://${ip[0].ipaddress}/devicelist.xml`);
    return deviceXML.data;
  },

};
