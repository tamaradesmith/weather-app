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

// Helpers

const ConfigHelpers = require('./configHelpers')
const NodeHelpers = require('./nodeHelper')


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


// get Config Devices 
router.get('/node/:id/devices/config', async (req, res) => {
  const id = req.params.id;
  const devicesXML = await NodeQuery.getDeviceListOnNode(id);
  const devices = ConfigHelpers.getDevices(devicesXML);
  res.send(devices);
})

// UPDATE

router.post(`/:type/:id/update`, async (req, res) => {
  const type = req.params.type;
  const id = req.params.id
  const info = req.body;
  const updateItem = await NodeQuery.update(type, info, id);
  res.send(updateItem);
})

// Node Routes

// get Nodes

router.get('/nodes', async (req, res) => {
  const nodes = await NodeQuery.getNodes();
  res.send(nodes)
})


// Search for nodes

router.get('/nodes/search', async (req, res) => {
  const nodes = await NodeHelpers.searchForNodes();
  res.send(nodes);
});

router.post('/node/create', async (req, res) => {
  const nodeInfo = req.body;
  const existing = await NodeQuery.nodeExist(nodeInfo);
  res.send(existing);
})

router.get('/node/:id', async (req, res) => {
  const id = req.params.id
  const node = await NodeQuery.getNodeById(id)
  res.send(node)
})

router.get('/node/:id/devices', async (req, res) => {
  const nodeId = req.params.id;
  const devices = await DeviceQuery.getDevicseByNodeId(nodeId);
  const devicesWithSensors = await SensorQuery.getAllSensorOnNodeByDevices(devices);
  const devicesWithController = await ControllerQuery.getAllControllersOnNodeByDevices(devicesWithSensors);
  res.send(devicesWithController)
})

router.get('/node/:id/devices/sensors', async (req, res) => {
  const nodeId = req.params.id;
  const devices = await DeviceQuery.getDevicseByNodeId(nodeId);
  const sensors = await SensorQuery.getAllSensorOnNodeByDevices(devices);
  res.send(sensors);
})

router.post('/nodes/active', async (req, res) => {
  const info = req.body;
  const node = await NodeQuery.updateActive(info.nodes);
  // console.log("node", node)
  res.send("good")
})

// DEVICE ROUTES

// create Device

router.post('/device/create', async (req, res) => {
  const info = req.body;
  const device = await DeviceQuery.create(info);
  res.send(device)
})

// get Device

router.get('/devices', async (req, res) => {
  const devices = await DeviceQuery.getDevices();
  res.send(devices)
})

// SENSOR ROUTES

// create Sensors

router.post('/sensor/create', async (req, res) => {
  const info = req.body;
  const sensor = await SensorQuery.create(info);
  res.send(sensor)
})

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
router.get('/sensors/locations', async (req, res) => {
  const locations = await SensorQuery.getSensorsLocations();
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

router.post('/controller/create', async (req, res) => {
  const info = req.body;
  const controller = await ControllerQuery.create(info);
  res.send(controller)
})

router.get('/controllers/types', async (req, res) => {
  const types = await ControllerQuery.getTypeofControllers();
  res.send(types)
})



module.exports = router;