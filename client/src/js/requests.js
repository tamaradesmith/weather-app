const BASE_URL = 'http://localhost:4000';

const Crud = {
  async create(type, node) {
    const res = await fetch(`${BASE_URL}/type/${type}/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(node),
    });
    return res;
  },
  async getExisting(type) {
    const res = await fetch(`${BASE_URL}/type/${type}/existing`);
    return res.json();
  },
  async getItemInfo(type, id) {
    const res = await fetch(`${BASE_URL}/type/${type}/${id}`);
    return res.json();
  },
  async update(type, info, id) {
    const res = await fetch(`${BASE_URL}/type/${type}/${id}/update`, {
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
  async getDevices(id) {
    const res = await fetch(`${BASE_URL}/node/${id}/devices`);
    return res.json();
  },
}

const Device = {
  async getDevices() {
    const res = await fetch(`${BASE_URL}/devices`);
    return res.json();
  }
}

const Sensor = {
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
  async getControllerTypes() {
    const res = await fetch(`${BASE_URL}/controllers/types`)
    return res.json();
  },
}

export { Sensor, Node, Device, Controller, Crud };