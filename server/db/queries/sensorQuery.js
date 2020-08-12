const knex = require('../../client');
const { andWhere } = require('../../client');

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

  // get sensor by id;
  async getSensor(id) {

    const sensor = await knex('sensors')
      .select("sensors.active", "sensors.name", "sensors.id", "sensors.description", "locations.name as location", 'sensor_types.type as type',)
      .join('devices', 'devices.id', 'sensors.device_id')
      .join('nodes', 'nodes.id', 'node_id')
      .join('locations', "locations.id", "location_id")
      .join("sensor_types", 'sensor_types.id', "sensors.type_id")
      .where("sensors.id", id)
    const sensorProperties = await knex('sensor_properties').select('*').where('sensor_id', id)
    sensorProperties.forEach(proptery => {
      sensor[0][proptery.name] = proptery.value
    })
    return sensor[0]
  },

  // SPECIAL QUERIES

  // Group sensor by Devices
  async getAllSensorOnNodeByDevices(devices) {
    await Promise.all(devices.map(async device => {
      const sensor = await knex('sensors').select('*').where({ device_id: device.id });
      device.sensors = sensor;
      return 'deviceSensor'
    }));
    return devices;
  },


  // ACTIVE UPDATES

  async activeByDeviceID(deviceId, activeState) {
    return await knex('sensors').where({ device_id: deviceId }).update({ active: activeState }).returning('id');
  },
  async activeBySensorsId(sensors) {
    return await Promise.all(sensors.map(async sensor => {
      const result = await knex('sensors').where({ id: sensor.id }).update({ active: sensor.active }).returning('id');
      return result[0];
    }));
  },


  // // READINGS QUERIES


  // get last reading one sensor
  async getLastReading(sensorId) {
    const reading = await knex('readings')
      .select('value')
      .where({ sensor_id: sensorId })
      .orderBy('time', "desc")
      .limit(1);
    const result = (reading[0] === undefined) ? { value: "none" } : reading[0];
    return result;
  },
  // async createReading(info) {
  //   // info.value = info.value.toFixed(2);
  //   const reading = knex('readings').insert(info).returning("*");
  //   return reading;
  // },
  // get High and Low 24 hours
  async getHighsAndLows(sensorId) {
    let date = new Date();
    date.setHours(00, 00, 00)
    const reading = await knex("readings").select("value").where({ sensor_id: sensorId }).andWhere('time', '>=', date).orderBy('value');
    const readings = { high: reading[reading.length - 1].value, low: reading[0].value }
    return readings
  },
  async getDayReading(sensorId) {
    let date = new Date();
    date.setHours(00, 00, 00)
    const reading = await knex('readings')
    .where({ sensor_id: sensorId })
    .andWhere('time', '>=', date)
    .sum('value as daily')
    return reading[0];
      


  //  .select('product')
  //   .sum('revenue')
  //   .from('orders')
  },
  async getReadingsBySensor(sensorId, period) {
    period = period > 1 ? period - 1 : period
    let date = new Date();
    date.setDate(date.getDate() - period)
    date.setHours(00);
    date.setMinutes(00);
    const readings = await knex('readings')
      .select('time', 'value'
      )
      .where({ sensor_id: sensorId })
      .andWhere('time', '>=', date)
      .orderBy('time', "asc")
    return readings
  },



  // TYPE QUERIES
  async getTypeId(type) {
    return await knex("sensor_types").select('id').where({ type });
  },

  // async getSensorType(id) {
  //   return await knex('sensors')
  //     .select('*')
  //     .join('sensor_types', 'sensor_types.id', 'type_id')
  //     .where( "sensors.id", id );
  // },

  // PROPERTIES QUERIES
  async createProperties(properties, sensorId) {
    const keys = Object.keys(properties)
    return await Promise.all(keys.map(async (key) => {
      return knex('sensor_properties').insert({ sensor_id: sensorId, name: key, value: properties[key] }).returning('*');
    }));
  },
  async getChartType(id) {
    return await knex('sensor_properties')
      .select('value', 'name')
      .where({ sensor_id: id, name: 'mix' })
      .orWhere({ sensor_id: id, name: 'chart' })
      .orWhere({ sensor_id: id, name: 'formate' })
      .orWhere({ sensor_id: id, name: 'extra' })

      .orderBy('name')
  },
  async getPartner(id) {
    return await knex('sensor_properties')
      .select('value as partner')
      .where({ sensor_id: id, name: 'partner' })

  },
};

