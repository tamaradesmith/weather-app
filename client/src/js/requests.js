const BASE_URL = 'http://localhost:4000';

const Site = {
  async getAllSites() {
    try {
      const res = await fetch(`${BASE_URL}/sites`, {
        credentials: 'include',
      });
      return res.json();
    }
    catch (error) {
      console.log(error);
    }
  },
  async getLocations(siteId) {
    const res = await fetch(`${BASE_URL}/sites/${siteId}/locations`, {
      credentials: 'include',
    });
    return res.json();
  }
}
const Node = {

  async getNodes() {
    const res = await fetch(`${BASE_URL}/nodes`, {
      credentials: 'include',
    });
    if (res.ok){
      return res.json();
    } else {
     return res.ok;
    } 
  },
  async getNode(NodeId) {
    const res = await fetch(`${BASE_URL}/nodes/${NodeId}`, {
      credentials: 'include',
    });
    return res.json();
  },
  async create(info) {
    const res = await fetch(`${BASE_URL}/nodes`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info)
    });
    return res.json();
  },

  async updateActiveStates(info) {
    const res = await fetch(`${BASE_URL}/nodes/active`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info)
    })
      .catch(error => {
        console.log(error)
      });
    return res.json();
  },
  async searchForNodes() {
    const res = await fetch(`${BASE_URL}/nodes/search`, {
      credentials: 'include',
    });
    return res.json();
  },
  async getDeivcesByNodeId(nodeId) {
    const res = await fetch(`${BASE_URL}/nodes/${nodeId}/devices`, {
      credentials: 'include',
    });
    return res.json();
  },
}

const Device = {
  // async getDevices() {
  //   const res = await fetch(`${BASE_URL}/devices`);
  //   return res.json();
  // },
  async getDevicesFromNodeById(nodeId) {
    const res = await fetch(`${BASE_URL}/nodes/${nodeId}/devices/config`, {
      credentials: 'include',
    });
    return res.json();
  },
  async create(info) {
    const res = await fetch(`${BASE_URL}/devices`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info),
    });
    return res.json()
  },
  // async getDeviceList(nodeId) {
  //   const res = await fetch(`${BASE_URL}/node/${nodeId}/deviceList`);
  //   return res.json();
  // },
}

const Sensor = {

  async create(info) {
    try {
      const res = await fetch(`${BASE_URL}/sensors`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(info),
      })
      return res.json();
    } catch (error) {
      console.log(error.message);
    }

  },
  async getSensor(id) {
    try {
      const res = await fetch(`${BASE_URL}/sensors/${id}`, {
        credentials: 'include',
      })
      return res.json();
    } catch (error) {
      console.log(error.message)
    }
  },

  // async getSensors() {
  //   const res = await fetch(`${BASE_URL}/sensors`);
  //   return res.json();
  // },
  async getLastReading(sensorId) {
    try {
      const res = await fetch(`${BASE_URL}/sensors/${sensorId}/reading`, {
        credentials: 'include',
      });
      return res.json();
    } catch (error) {
      console.log(error.message)
    }
  },
  async getSensorsReadings(sensors) {
    try {
      const res = await fetch(`${BASE_URL}/sensors/${sensors}/readings`, {
        credentials: 'include',
      });
      return res.json();
    } catch (error) {
      console.log(error.message);
    }
  },
  // temperature  
  async getHighsAndLows(sensorId) {
    try {
      const res = await fetch(`${BASE_URL}/sensors/${sensorId}/highslows`, {
        credentials: 'include',
      });
      return res.json();
    } catch (error) {
      console.log(error.message);

    }
  },
  async getLast24Readings(sensorId) {
    try {
      const res = await fetch(`${BASE_URL}/sensors/${sensorId}/24`, {
        credentials: 'include',
      })
      return res.json();
    } catch (error) {
      console.log(error.message);
    }
  },
};

const Controller = {
  async create(info) {
    const res = await fetch(`${BASE_URL}/controllers`, {
      method: 'POST',
      credentials: 'include',
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
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(info),
    })
    return res.json()
  },
};

const Display = {
  async getDisplaySensors(display) {
    const res = await fetch(`${BASE_URL}/display/${display}`, {
      credentials: 'include',
    });
    return res.json();
  },
};

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
      console.log("this is an error", err)
    });
    return res.json();
  },
  async getUser(){
    const res = await fetch(`${BASE_URL}/auth/`,{
      credentials: 'include',
      })
      return res.json();
    
  },
};

export { Site, Sensor, Node, Device, Controller, Property, User, Display };