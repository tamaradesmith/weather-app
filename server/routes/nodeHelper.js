const axios = require('axios');
const BASE_IP = '192.168.1.';
const fields = ['description', 'location', 'type'];


module.exports = {
  async searchForNodes(count = 50, nodes = []) {
    const index = [];
    for (let i = count; i <= count + 9; i++) {
      if (i < 256) {
        index.push(i);
      }
    };
    await Promise.all(index.map(number => {
      return new Promise(async (res, rej) => {
        try {
          const response = await this.search(number);
          nodes.push(response);
          res(response);
        } catch (error) {
          return rej(error);
        };
      });
    })).catch(error => {
      console.log("searchForNodes Promise.all -> error", error)
    });
    if (count + 9 > 100) {
      return nodes;
    } else {
      return this.searchForNodes(count + 10, nodes)
    };
  },
  async search(index) {
    return new Promise(async (res, rej) => {
      const timer = setTimeout(() => {
        return rej(new Error("too long: ", index))
      }, 4000);
      try {
        const node = await axios.get(`http://${BASE_IP}${index}/rest/node/name`);
        const name = this.getValue(node.data)
        clearTimeout(timer);
        const nodeInfo = { ip: BASE_IP + index, name }
        if (node != null) {
          const nodeAllInfo = await this.getInfo(nodeInfo);
          res(nodeAllInfo);
        }
        return {};
      }
      catch (error) {
        clearTimeout(timer);
        rej("no node: " + index);
      };
    });
  },
  async getInfo(nodeInfo) {
    Promise.all(fields.map(async (field) => {
      try {
        return new Promise(async (res, rej) => {
          try {
            const node = await axios.get(`http://${nodeInfo.ip}/rest/node/${field}`);
            const value = await this.getValue(node.data);
            nodeInfo[field] = value;
            res(nodeInfo);
          }
          catch (error) {
            rej(error);
          };
        });
      }
      catch (error_1) {
        console.log(error_1);
      }
    })).catch(error => {
      console.log(error)
    });
    return nodeInfo
  },
  getValue(data) {
    const start = data.indexOf("<value>");
    const end = data.indexOf("</value>");
    return data.substring(start + 7, end);
  },
}