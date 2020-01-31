const BASE_URL = 'http://localhost:4000';

const Sensor = {
  async getLastReading(sensorId) {
    const res = await fetch(`${BASE_URL}/sensor/${sensorId}`);
    return res.json();
  },
  // temperature 
  async getTemperatureSensors() {
    const res = await fetch(`${BASE_URL}/sensors/temperature`);
    return res.json();
  },
  async getHighsAndLows(sensorId){
    const res = await fetch(`${BASE_URL}/sensor/${sensorId}/highslows`);
    return res.json();
  },
  // Wind
  async getWindSensors(){
    const res = await fetch(`${BASE_URL}/sensors/wind`);
    return res.json();
  },
  async getWindSensorReading(sensorId) {
    const res = await fetch(`${BASE_URL}/sensors/wind/${sensorId}/reading`);
    return res.json();
  },
}


export { Sensor };