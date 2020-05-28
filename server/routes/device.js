
const express = require('express');
const router = express.Router();

const DeviceQuery = require('../db/queries/deviceQuery');

router.post('/', async (req, res) => {
  const info = req.body;
  const device = await DeviceQuery.create(info);
  res.send(device)
})

// get Device

router.get('/', async (req, res) => {
  const devices = await DeviceQuery.getDevices();
  res.send(devices)
});



module.exports = router;
