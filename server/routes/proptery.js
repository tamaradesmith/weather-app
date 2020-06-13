const express = require('express');
const router = express.Router();

const PropertyQuery = require('../db/queries/propertyQuery');

router.post('/', async (req, res) => {
  const info = req.body;
  const typeId = await PropertyQuery.getTypeId(info.type.toLowerCase())
  console.log("typeId", typeId);
  console.log("info.properties", info.properties);
  info.properties.type_id = typeId.id;
  const property = await PropertyQuery.create(info.properties);
  const properyInfo = await PropertyQuery.createProperties(info.property_properties, property.id);
  res.send(property);
});

module.exports = router;