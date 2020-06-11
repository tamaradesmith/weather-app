const BASE_URL = 'http://localhost:4000';

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
    const res = await fetch(`${BASE_URL}/nodes/${NodeId}`);
    return res.json();
  },
  async create(info) {
    const res = await fetch(`${BASE_URL}/nodes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info)
    });
    return res.json();
  },
  async getSites() {
    const res = await fetch(`${BASE_URL}/nodes/sites`);
    return res.json();
  },
  async updateActiveStates(info) {
    const res = await fetch(`${BASE_URL}/nodes/active`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info)
    });
    return res.json();
  },
}

const Device = {
  async getDevices() {
    const res = await fetch(`${BASE_URL}/devices`);
    return res.json();
  },
  async getDevicesFromNodeById(nodeId) {
    const res = await fetch(`${BASE_URL}/nodes/${nodeId}/devices/config`);
    return res.json();
  },
  async getDeivcesByNodeId(nodeId) {
    const res = await fetch(`${BASE_URL}/nodes/${nodeId}/devices`);
    return res.json();
  },
  async create(info) {
    const res = await fetch(`${BASE_URL}/devices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info),
    });
    return res.json()
  },
  async getDeviceList(nodeId) {
    const res = await fetch(`${BASE_URL}/node/${nodeId}/deviceList`);
    return res.json();
  }
}

const Sensor = {
  async create(info) {
    const res = await fetch(`${BASE_URL}/sensors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(info),
    })
    return res.json()
  },
  async getLastReading(sensorId) {
    const res = await fetch(`${BASE_URL}/sensors/${sensorId}/reading`);
    return res.json();
  },
  async getSensorsbyTypeandSite(type, site) {
    const res = await fetch(`${BASE_URL}/sensors/site/${site}/type/${type}`)
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
  async getSensorsBySite(site){
    const res = await fetch(`${BASE_URL}/sensors/site/${site}`);
    return res.json();
  },
  async getSiteSensorsReading(site){
    const res = await fetch(`${BASE_URL}/sensors/site/${site}/readings`);
    return res.json();
  },
  async getSensorsLocations() {
    const res = await fetch(`${BASE_URL}/sensors/locations`);
    return res.json();
  },
  async getSensorGroupedbyDeviceByNodeId(nodeId) {
    const res = await fetch(`${BASE_URL}/node/${nodeId}/devices/sensors`);
    return res.json();
  },
  // temperature  
  async getHighsAndLows(sensorId) {
    const res = await fetch(`${BASE_URL}/sensors/${sensorId}/highslows`);
    return res.json();
  },
  async getLast24Readings(sensorId) {
    const res = await fetch(`${BASE_URL}/sensors/${sensorId}/24`)
    return res.json();
  },
};

const Controller = {
  async create(info) {
    const res = await fetch(`${BASE_URL}/controllers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(info),
    })
    return res.json()
  },
}

const Property = {
  async create(info) {
    const res = await fetch(`${BASE_URL}/properties`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(info),
    })
    return res.json()
  },
}
const User = {
  async login(user) {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
    }).catch(err => {
      console.log("this is a n error", err)
    });
    return res.json();
  },
  async user(id) {
    console.log("user -> id", id);
    const res = await fetch(`${BASE_URL}/nodes/users/${id}`);
    return res.json();
  }
}

export { Sensor, Node, Device, Controller, Property, User };