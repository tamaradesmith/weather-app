const knex = require('../../client');

// const axios = require('axios');

module.exports = {

  async create(info) {
    const sensor = await knex("sensors").insert(info).returning("*");
    return sensor[0];
  },
  // get Sensors
  async getSensors() {
    const sensors = await knex('sensors').select('*').where({ active: true });
    return sensors;
  },


  // SPECIAL QUERIES

  // Group sensor by Devices
  async  getAllSensorOnNodeByDevices(devices) {
    await Promise.all(devices.map(async device => {
      const sensor = await knex('sensors').select('*').where({ device_id: device.id });
      device.sensors = sensor;
      return 'deviceSensor'
    }));
    return devices;
  },
  // get Sensors by Type 
  // async getSensorsByType(type, site) {
  //   const sensors = await knex('devices')
  //   .join('nodes', 'nodes.id', "node_id")
  //   .select("nodes.site", "nodes.location", 'nodes.active', "devices.id")
  //   .join('sensors', 'devices.id', 'device_id')
  //   .select('*')

  //     .where({ site: site, location: "outside" }).andWhere('sensors.type', type).andWhere('sensors.active', true)
  //   .orWhere({ site: site, location: "inside" })
  //   .andWhere('sensors.type', type).andWhere('sensors.active', true)
  //   return sensors;
  // },
  // async getSensorsBySite(site) {
  //   const sensors = await knex('devices')
  //     .join('nodes', 'nodes.id', 'node_id')
  //     .join('sensors', 'device_id', 'devices.id')
  //     .select("nodes.site", 'nodes.id as node_id', 'devices.id as device_id', "nodes.location", 'sensors.type', 'sensors.id as sensor_id', "sensors.max", "sensors.min", 'sensors.name', "sensors.active as sensor_active")
  //     .where("devices.active", true).andWhere('sensors.active', true)
  //     .andWhere({ site: site, location: 'outside' })
  //     .orWhere({ site: site, location: 'inside' }).andWhere('sensors.active', true).andWhere("devices.active", true)
  //   return sensors
  // },
  // // get Sensors by Type and Device Id
  // async getSensorsByTypeAndDeviceId(type, deviceId) {
  //   const sensors = await knex('sensors').select("*").where({ type, device_id: deviceId, active: true });
  //   return sensors[0];
  // },
  // // get all different type of sensors
  // async getTypeOfSensors() {
  //   const types = await knex.distinct().from('sensors').pluck("type");
  //   return types
  // },
  // // get Sensors locations
  // async getSensorsLocations() {
  //   const locations = await knex.distinct().from('sensors').pluck("location").where({ active: true });
  //   return locations;
  // },
  // //  Get All Temperature Sensor- 
  // async getTemperatureSensors() {
  //   const sensors = await knex("sensors").select("*").where({ type: "temperature", active: true, location: 'outside' }).orWhere({ location: 'inside', type: "temperature", active: true })
  //   return sensors
  // },


  // // ACTIVE UPDATES

  // async activeByDeviceID(deviceId, activeState) {
  //   return await knex('sensors').where({ device_id: deviceId }).update({ active: activeState }).returning('id');
  // },
  // async activeBySensorsId(sensors) {
  //   return await Promise.all(sensors.map(async sensor => {

  //     const result = await knex('sensors').where({ id: sensor.id }).update({ active: sensor.active }).returning('id');
  //     return result[0];
  //   }));
  // },


  // // READINGS QUERIES


  // get last reading one sensor
  async getLastReading(sensorId) {
    const reading = await knex('readings').select('value').where({ sensor_id: sensorId }).orderBy('time', "desc").limit(1);
    const result = (reading[0] === undefined) ? { value: "none" } : reading[0];
    return result;
  },

  // async createReading(info) {
  //   // info.value = info.value.toFixed(2);
  //   const reading = knex('readings').insert(info).returning("*");
  //   // console.log("createReading -> reading", reading);
  //   return reading;
  // },
  // // get High and Low 24 hours
  // async getHighsAndLows(sensorId) {
  //   const reading = await knex("readings").select("value").where({ sensor_id: sensorId }).orderBy('value');
  //   const readings = { high: reading[reading.length - 1].value, low: reading[0].value }
  //   return readings
  // },
  // async getLast24ReadingsBySensor(sensorId) {
  //   const readings = await knex('readings').select("value", "time").where({ sensor_id: sensorId }).orderBy('time', "desc").limit(12);
  //   return readings
  // },
  // async getLastReading(sensorId) {
  //   const reading = await knex('readings').select("value", 'time').where({ sensor_id: sensorId }).orderBy('time').limit(1);
  //   return reading[0]
  // },
  // async getSensorsLastReadings(sensors) {
  //   return await Promise.all(sensors.map(async (sensor) => {
  //     const reading = await this.getLastReading(sensor.sensor_id);
  //     sensor.reading = reading;
  //     return sensor;
  //   }));
  // },

  // TYPE QUERIES

  async getTypeId(type) {
    console.log("getTypeId -> type", type);
    return await knex("sensor_types").select('id').where({ type });
  },


  // PROPERTIES QUERIES
  async createProperties(properties, sensorId) {
    const keys = Object.keys(properties)
    return await Promise.all(keys.map(async (key) => {
      return knex('sensor_properties').insert({ sensor_id: sensorId, name: key, value: properties[key] }).returning('*');
    }))
  }
}