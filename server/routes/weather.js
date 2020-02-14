const express = require('express');
const router = express.Router();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// query
const NodeQuery = require('../db/queries/nodeQuery.js');
const DeviceQuery = require('../db/queries/deviceQuery');
const SensorQuery = require('../db/queries/sensorQuery');
const ControllerQuery = require('../db/queries/controllerQuery');

// Save Reading to DB

router.post('/sensors/readings', (req, res) => {
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

// CREATE
router.post('/type/:type/create', async (req, res) => {
  const type = req.params.type;
  const body = req.body;
  const nodeStatus = await NodeQuery.create(type, body)
  res.send(nodeStatus);
})

// UPDATE

router.post(`/type/:type/:id/update`, async (req, res) =>{
  const type = req.params.type;
  const id = req.params.id
  const info = req.body;
  console.log("TCL: info", info)
  const updateItem = await NodeQuery.update(type, info, id);
  res.send(updateItem);
})

//  Get Existing

router.get('/type/:type/existing', async (req, res) =>{
  const type = req.params.type;
  const list = await NodeQuery.getExisting(type);
  res.send(list);
})

router.get('/type/:type/:id', async(req, res) =>{
  const type = req.params.type;
  const id = req.params.id;
  const item = await NodeQuery.getItemInfo(type, id);
  res.send(item);
})

// Node Routes
// get Nodes

router.get('/nodes', async (req, res) => {
  const nodes = await NodeQuery.getNodes();
  res.send(nodes)
})

// get locations 
router.get("/nodes/locations", async (req, res) => {
  const locations = await NodeQuery.getNodesLocations();
  res.send(locations);
})


// DEVICE ROUTES

// get Device

router.get('/devices', async (req, res) => {
  const devices = await DeviceQuery.getDevices();
  res.send(devices)
})

// SENSOR ROUTES

router.get('/sensors', async (req, res) => {
  const sensors = await SensorQuery.getSensors();
  res.send(sensors);
})

router.get('/sensors/types', async (req, res) => {
  const types = await SensorQuery.getTypeOfSensors();
  res.send(types);
})
router.get('/sensors/type/:type', async (req, res) => {
  const type = req.params.type
  const sensors = (type != "temperature") ? await SensorQuery.getSensorsByType(type) : await SensorQuery.getTemperatureSensors();
  res.send(sensors);
})
 router.get('/sensors/locations', async (req, res) =>{
   const locations = await SensorQuery.getSensorsLocations();
   console.log("TCL: locations", locations)
   res.send(locations)
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
router.get('/sensor/:id/24', async (req, res) => {
  const sensorId = req.params.id;
  const readings = await SensorQuery.getLast24ReadingsBySensor(sensorId);
  res.send(readings)
})

// CONTROLLER ROUTES

router.get('/controllers/types', async (req, res) => {
  const types = await ControllerQuery.getTypeofControllers();
  res.send(types)
})



module.exports = router;