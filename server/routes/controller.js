const express = require('express');
const router = express.Router();

const ControllerQuery = require('../db/queries/controllerQuery');


// CONTROLLER ROUTES

router.post('/', async (req, res) => {
  const info = req.body;
  const controller = await ControllerQuery.create(info);
  res.send(controller)
})

router.get('/types', async (req, res) => {
  const types = await ControllerQuery.getTypeofControllers();
  res.send(types)
})


module.exports = router;
