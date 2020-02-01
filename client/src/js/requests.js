const BASE_URL = 'http://localhost:4000';

const Sensor = {
  async getLastReading(sensorId) {
    const res = await fetch(`${BASE_URL}/sensor/${sensorId}/reading`);
    return res.json();
  },
  async getSensorsbyType(type) {
    const res = await fetch(`${BASE_URL}/sensors/type/${type}`)
    return res.json()
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
 


export { Sensor };