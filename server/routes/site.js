const express = require('express');
const router = express.Router();

// QUERY
const SiteQuery = require('../db/queries/siteQuery');
const LocationQuery = require('../db/queries/locactionQuery');


// GET ALL SITES
router.get('/', async (req, res) => {
  const sites = await SiteQuery.getSites();
  res.send(sites);
});

// get ALL LOCATIONS

router.get('/:site/locations', async (req, res) => {
  const siteId= req.params.site
  const locations = await LocationQuery.getLocationsBySiteId(siteId);
  res.send(locations);
})




module.exports = router;