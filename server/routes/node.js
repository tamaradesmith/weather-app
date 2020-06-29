const express = require('express');
const router = express.Router();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// QUERY

const NodeQuery = require('../db/queries/nodeQuery.js');
const DeviceQuery = require('../db/queries/deviceQuery');
const SensorQuery = require('../db/queries/sensorQuery');
const ControllerQuery = require('../db/queries/controllerQuery');
const PropertyQuery = require('../db/queries/propertyQuery');
const UserQuery = require('../db/queries/userQuery');

// // Helpers

const ConfigHelpers = require('./configHelpers');
const NodeHelpers = require('./nodeHelper');
const AuthMiddleware = require('./middleware')
// Node Routes


// Search for nodes

router.get('/search', async (req, res) => {
  const nodes = await NodeHelpers.searchForNodes();
  res.send(nodes);
});




// // CRUD ROUTES

router.get('/', async (req, res) => {
  const nodes = await NodeQuery.getNodes();
  res.send(nodes);
});

router.post('/', async (req, res, next) => {
  const id = req.signedCookies.user;
  const admin = await AuthMiddleware.isAdmin(id);
  if (admin) {
    const nodeInfo = req.body;
    const existing = await NodeQuery.nodeExist(nodeInfo);
    res.send(existing);
  } else {
    res.status(401).send({ error: 'Unauthorized' });
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id
  const node = await NodeQuery.getNodeById(id)
  res.send(node);

});


// Special ROUTES

// get  DEVICE XML FILE

router.get('/:id/devices/config', async (req, res) => {
  const id = req.params.id;
  const devicesXML = await NodeQuery.getDeviceListOnNode(id);
  const devices = ConfigHelpers.getDevices(devicesXML);
  res.send(devices);
})

// GET EVERY THING ON NODE

router.get('/:id/devices', async (req, res) => {
  const nodeId = req.params.id;
  const devices = await DeviceQuery.getAllDeviceDependentByNodeId(nodeId);
  res.send(devices);
});

router.patch('/active', async (req, res) => {
  const id = req.signedCookies.user;
  const admin = await AuthMiddleware.isAdmin(id);
  if (admin) {
    const info = req.body;
    let result = {};
    if (info.nodes) {
      result = await NodeQuery.updateActive(info.nodes);
    } else if (info.devices.length > 0) {
      result = await DeviceQuery.activeByDevicesId(info.devices);
    } else {
      if (info.sensors.length > 0) {
        result.sensors = await SensorQuery.activeBySensorsId(info.sensors);
      };
      if (info.controllers.length > 0) {
        result.controllers = await ControllerQuery.activeByControllersId(info.controllers);
      };
      if (info.properties.length > 0) {
        result.properties = await PropertyQuery.activeByPropertiesId(info.properties);
      };
    };
    res.send(result);
  } else {
    res.status(401).send({ error: 'Unauthorized' });
  }

});


module.exports = router;