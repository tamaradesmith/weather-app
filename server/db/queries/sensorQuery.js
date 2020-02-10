const knex = require('../../client');
// const axios = require('axios');

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
    const reading = await knex('readings').select('value').where({ sensor_id: sensorId }).orderBy('time', "desc").limit(1)
    return reading[0];
  },
  // get Sensors
  async getSensors(){
    const sensors = await knex('sensors').select('*').where({active: true});
    return sensors;
  },
  // get Sensors by Type 
  async getSensorsByType(type){
    const sensors = await knex('sensors').select("*").where({type: type, active: true});
    return sensors;
  },
  // get all different type of sensors
  async getTypeOfSensors(){
    const types = await knex.distinct().from('sensors').pluck("type");
    return types
  },
  //  Get Temperature Sensor- Inside and outside only
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
  async getLast24ReadingsBySensor(sensorId){
    const readings = await knex('readings').select("value", "time").where({sensor_id: sensorId}).orderBy('time', "desc").limit(12);
    return readings
  },
}