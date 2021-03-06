const express = require('express');
const router = express.Router();

const SensorQuery = require('../db/queries/sensorQuery');

const SensorHelpers = require('../js/sensorHelpers');

// SENSOR ROUTES

router.get('/', async (req, res) => {
  try {
    const sensors = await SensorQuery.getSensors();
    res.send(sensors);
  } catch (error) {
    res.send(error.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const info = req.body;
    const type = await SensorQuery.getTypeId(info.type.toLowerCase());
    info.sensor.type_id = type[0].id;
    const sensor = await SensorQuery.create(info.sensor);
    const properties = await SensorQuery.createProperties(info.properties, sensor.id);
    res.send(sensor);
  } catch (error) {
    res.send(error.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const sensor = await SensorQuery.getSensor(id);
    res.send(sensor);
  } catch (error) {
    res.send(error.message);
  }
});

// get last reading
router.get('/:id/reading', async (req, res) => {
  const sensorId = req.params.id;
  try {
    const lastSensorReading = await SensorQuery.getLastReading(sensorId)
    res.send(lastSensorReading);
  } catch (error) {
    const message = new Error({ sensor: sensorId, code: error.message })
    res.send(message);
  };
});

// Get Hightest and Lowest reading 

router.get('/:id/highslows', async (req, res) => {
  try {
    const sensorId = req.params.id;
    const highslows = await SensorQuery.getHighsAndLows(sensorId);
    res.send(highslows);
  } catch (error) {
    console.error("error", error);
    res.send(error.message);
  }
});

router.get('/:id/day', async (req, res) => {
  try {
    const sensorId = req.params.id;
    const daily = await SensorQuery.getDayReading(sensorId);
    res.send(daily);
  } catch (error) {
    console.error("error", error);
    res.send(error.message);
  }
});

// get partner
router.get('/:id/partner', async (req, res) => {
  try {
    const { id } = req.params;
    const partner = await SensorQuery.getPartner(id);
    const sensor = await SensorQuery.getSensor(partner[0].partner)
    res.send(sensor)
  } catch (error) {
    console.error(error.message);
    res.send(error.message);

  }
})

// get readings by period
router.get('/:id/:period', async (req, res) => {
  try {
    const { id, period } = req.params;
    let readings
    try {
      readings = await SensorQuery.getReadingsBySensor(id, period);

    } catch (error) {
    console.error("error readings", error.message);
      res.send(error.message);
    }
    const chart = await SensorQuery.getChartType(id);
    const partner = await SensorQuery.getPartner(id);
    if ("partner", partner.length !== 0) {
      const partnerReadings = await SensorQuery.getReadingsBySensor(partner[0].partner, period);
      const partnerChart = await SensorQuery.getChartType(parseInt(partner[0].partner));
      readings = ['partner', { sensor: readings, chart: chart }, { sensor: partnerReadings, chart: partnerChart }];
    };
    try {
      const readingFormated = SensorHelpers.formateReadings(period, readings, chart);
      res.send(readingFormated)
    } catch (error) {
      console.error(error);
      res.send(error.message);
    };
  } catch (error) {
    res.send(error.message);
  };
});

// Save Reading to DB

router.post('/reading', (req, res) => {
  // const postParams = {
  //   node: req.body.node,
  //   device: req.body.device,
  //   sensor: req.body.sensor,
  //   date: req.body.date,
  //   value: req.body.value,
  // };
  // SensorQuery.saveSensorReading(postParams);
  // res.send(postParams.sensor);
  res.send("create reading route");

});

module.exports = router;
