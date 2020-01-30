const knex = require('../../client');
const axios = require('axios');

module.exports = {
  async  saveSensorReading(params) {
    const nodeData = await knex('nodes').select("*").where({ name: params.node });
    const deviceData = await knex('devices').select("*").where({ name: params.device, node_id: nodeData[0].id });
    const sensorData = await knex('sensors').select("*").where({ name: params.sensor, device_id: deviceData[0].id });
    const reading = await knex('readings').insert([
      {
        value: params.value,
        time: params.date,
        sensor_id: sensorData[0].id,
      }
    ])
    return "reading Saved"
  },
  // get last reading one sensor
  async getLastReading(sensorId) {
    const reading = await knex('readings').select('*').where({ sensor_id: sensorId }).orderBy('time', "desc").limit(1)
    return reading[0];
  },
  //  Get Temperature Sensor
  async getTemperatureSensors() {
    const sensors = await knex("sensors").select("*").where({ location: 'inside' }).orWhere({ location: 'outside' }).andWhere({ type: "temperature", active: true })
    return sensors
  },
  // get High and Low 24 hours
  async getHighsAndLows(sensorId){
    const reading = await knex("readings").select("value").where({sensor_id: sensorId}).orderBy('value');
    const readings = {high: reading[reading.length - 1].value, low: reading[0].value}
    return readings
  },
  //  Wind Direction
  async getWindDirection() {
    const windSensor = await knex('sensors').select("*").where({ propose: 'Wind direction' });
    const windDirection = await this.getLastReading(windSensor[0].id)
    return windDirection;
  }
}