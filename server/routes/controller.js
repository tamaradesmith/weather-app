const express = require('express');
const router = express.Router();

const ControllerQuery = require('../db/queries/controllerQuery');


// CONTROLLER ROUTES

router.post('/', async (req, res) => {
  const info = req.body;
  const typeId = await ControllerQuery.getTypeId(info.type.toLowerCase());
  info.controller.type_id = typeId[0].id;
  const controller = await ControllerQuery.create(info.controller);
  const controllerProperties = await ControllerQuery.createProperties(info.property, controller.id);
  res.send(controller)
})

router.get('/types', async (req, res) => {
  const types = await ControllerQuery.getTypeofControllers();
  res.send(types)
})


module.exports = router;
