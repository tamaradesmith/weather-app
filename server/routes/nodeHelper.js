const axios = require('axios');
const BASE_IP = '192.168.1.';
const fields = ['description', 'location', 'type'];


module.exports = {
  async searchForNodes() {
    const index = [];
    for (let i = 70; i <= 86; i++) {
      index.push(i);
    };
    let existingNodes = await Promise.all(index.map(number => {
      return new Promise(async (res, rej) => {
        try {
          const response = await this.search(number);
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
    if (nodes.length === 0) {
      nodes.push({ name: "no nodes found" })
    }
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
}