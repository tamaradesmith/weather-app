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

// TEMPERATURE

router.get('/sensor/:id', async (req, res) => {
  const sensorId = req.params.id;
  const lastSensorReading = await SensorQuery.getLastReading(sensorId);
  res.send(lastSensorReading);
});

router.get('/sensors/temperature', async (req, res) => {
  const sensors = await SensorQuery.getTemperatureSensors();
  res.send(sensors);
});

router.get('/sensor/:id/highslows', async (req, res) => {
  const sensorId = req.params.id;
  const highslows = await SensorQuery.getHighsAndLows(sensorId);
  res.send(highslows);
})

// WIND
router.get('/sensors/windDirection', async (req, res) => {
  const windDirection = await SensorQuery.getWindDirection();
  res.send(windDirection);
})

module.exports = router;