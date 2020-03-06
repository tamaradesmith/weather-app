const BASE_URL = 'http://localhost:4000';

const Crud = {
  async create(type, info) {
    const res = await fetch(`${BASE_URL}/${type}/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info),
    });
    return res.json();
  },

  async getExisting(type) {
    const res = await fetch(`${BASE_URL}/${type}/existing`);
    return res.json();
  },

  async update(type, info, id) {
    const res = await fetch(`${BASE_URL}/${type}/${id}/update`, {
      method: `POST`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info),
    });
    return res;
  }
}

const Node = {
  async searchForNodes() {
    const res = await fetch(`${BASE_URL}/nodes/search`);
    return res.json();
  },
  async getNodes() {
    const res = await fetch(`${BASE_URL}/nodes`);
    return res.json();
  },
  async getNode(NodeId) {
    const res = await fetch(`${BASE_URL}/node/${NodeId}`);
    return res.json();
  },
  async CheckIfNodeExist(node) {
    const res = await fetch(`${BASE_URL}/nodes/check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(node)
    });
    return res.json();
  },
//   async getNodeAndDepentenceById(nodeId){
// const  res = fetch(`${BASE_URL}/node/${n`);
// return res.json();
  // },
  // async getDevices(Nodeid) {
  //   const res = await fetch(`${BASE_URL}/node/${Nodeid}/devices`);
  //   return res.json();
  // },
}

const Device = {
  async getDevices() {
    const res = await fetch(`${BASE_URL}/devices`);
    return res.json();
  },
  async getDevicesFromNodeById(nodeId) {
    const res = await fetch(`${BASE_URL}/node/${nodeId}/devices/config`);
    return res.json();
  },
  async getDeivcesByNodeId(nodeId){
const res= await fetch(`${BASE_URL}/node/${nodeId}/device`);
return res.json();
  },
  async create(info) {
    const res = await fetch(`${BASE_URL}/device/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info),
    });
    return res.json()
  },
}

const Sensor = {
  async create(info) {
    const res = await fetch(`${BASE_URL}/sensor/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(info),
    })
    return res.json()
  },
  async getLastReading(sensorId) {
    const res = await fetch(`${BASE_URL}/sensor/${sensorId}/reading`);
    return res.json();
  },
  async getSensorsbyType(type) {
    const res = await fetch(`${BASE_URL}/sensors/type/${type}`)
    return res.json()
  },
  async getSensors() {
    const res = await fetch(`${BASE_URL}/sensors`);
    return res.json();
  },
  async getSensorsTypes() {
    const res = await fetch(`${BASE_URL}/sensors/types`)
    return res.json();
  },
  async getSensorsLocations() {
    const res = await fetch(`${BASE_URL}/sensors/locations`);
    return res.json();
  },
  // temperature  
  async getHighsAndLows(sensorId) {
    const res = await fetch(`${BASE_URL}/sensor/${sensorId}/highslows`);
    return res.json();
  },
  async getLast24Readings(sensorId) {
    const res = await fetch(`${BASE_URL}/sensor/${sensorId}/24`)
    return res.json();
  },
}

const Controller = {
  async create(info) {
    const res = await fetch(`${BASE_URL}/controller/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(info),
    })
    return res.json()
  },
  // async getControllerTypes() {
  //   const res = await fetch(`${BASE_URL}/controllers/types`)
  //   return res.json();
  // },
}

export { Sensor, Node, Device, Controller, Crud };