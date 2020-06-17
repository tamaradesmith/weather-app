
const express = require('express');
const router = express.Router();

const DisplayQuery = require('../db/queries/displayQuery')

router.get('/:type/:user', async (req, res) => {
  const { user, type } = req.params;
  const sensors = await DisplayQuery.getDisplaySensors(type, user)
  return res.send(sensors)
})

module.exports = router;
