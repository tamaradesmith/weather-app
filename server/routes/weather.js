const express = require('express');
const router = express.Router();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// query
const SensorQuery = require('../db/queries/sensorQuesry');

// Save Reading to DB

router.post('/sensors/readings', (req, res) => {
  console.log("hi Hudson and Aurora")
  const postParams = {
    node: req.body.node,
    device: req.body.device,
    sensor: req.body.sensor,
    date: req.body.date,
    value: req.body.value,
  };
  SensorQuery.saveSensorReading(postParams);
  res.send(postParams.sensor);
})

// sensor requests

router.get('/sensors/type/:type', async (req, res) => {
  const type = req.params.type
  const sensors = (type != "temperature") ? await SensorQuery.getSensorsByType(type) : await SensorQuery.getTemperatureSensors();
  res.send(sensors);
})

// get last reading
router.get('/sensor/:id/reading', async (req, res) => {
  const sensorId = req.params.id;
  const lastSensorReading = await SensorQuery.getLastReading(sensorId);
  res.send(lastSensorReading);
});


// Get Hightest and Lowest reading 

router.get('/sensor/:id/highslows', async (req, res) => {
  const sensorId = req.params.id;
  const highslows = await SensorQuery.getHighsAndLows(sensorId);
  res.send(highslows);
});
// get last 24 readings
router.get('/sensor/:id/24', async (req, res) =>{
  const sensorId = req.params.id;
  const  readings = await SensorQuery.getLast24ReadingsBySensor(sensorId);
  // console.log("TCL: readings", readings)
  res.send(readings)
})



module.exports = router;