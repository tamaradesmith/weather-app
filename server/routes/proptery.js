const express = require('express');
const router = express.Router();

const PropertyQuery = require('../db/queries/propertyQuery');

router.post('/', async (req, res) => {
  const info = req.body;
  const property = await PropertyQuery.create(info);
  res.send(property);
});

module.exports = router;