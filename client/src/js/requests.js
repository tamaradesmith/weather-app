const BASE_URL = 'http://localhost:4000';

const Sensor = {
  // temperature 
  async getLastReading(sensorId) {
    const res = await fetch(`${BASE_URL}/sensor/${sensorId}`);
    return res.json();
  },
  async getTemperatureSensors() {
    const res = await fetch(`${BASE_URL}/sensors/temperature`);
    return res.json();
  },
  async getHighsAndLows(sensorId){
    const res = await fetch(`${BASE_URL}/sensor/${sensorId}/highslows`);
    return res.json();
  },
  // Wind
  async getWindDirection() {
    const res = await fetch(`${BASE_URL}/sensors/windDirection`);
    return res.json();
  },
}


export { Sensor };