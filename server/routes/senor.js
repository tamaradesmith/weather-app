const express = require('express');
const router = express.Router();

const SensorQuery = require('../db/queries/sensorQuery');


// SENSOR ROUTES

router.post('/', async (req, res) => {
  const info = req.body;
  const sensor = await SensorQuery.create(info);
  res.send(sensor)
})

router.get('/', async (req, res) => {
  const sensors = await SensorQuery.getSensors();
  res.send(sensors);
})

// ******* need checking may 27 *******
// router.get('/types', async (req, res) => {
//   const types = await SensorQuery.getTypeOfSensors();
//   res.send(types);
// });

router.get('/site/:site/type/:type', async (req, res) => {
  const {type, site} = req.params;
  const sensors = await SensorQuery.getSensorsByType(type, site);
  console.log("sensors", sensors);
  res.send(sensors);
})

router.get('/locations', async (req, res) => {
  const locations = await SensorQuery.getSensorsLocations();
  res.send(locations)
})

// get last reading
router.get('/:id/reading', async (req, res) => {
  const sensorId = req.params.id;
  const lastSensorReading = await SensorQuery.getLastReading(sensorId);
  res.send(lastSensorReading);
});


// Get Hightest and Lowest reading 

router.get('/:id/highslows', async (req, res) => {
  const sensorId = req.params.id;
  const highslows = await SensorQuery.getHighsAndLows(sensorId);
  res.send(highslows);
});
// get last 24 readings
router.get('/:id/24', async (req, res) => {
  const sensorId = req.params.id;
  const readings = await SensorQuery.getLast24ReadingsBySensor(sensorId);
  res.send(readings)
})

// Save Reading to DB

router.post('/readings', (req, res) => {
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



module.exports = router;
