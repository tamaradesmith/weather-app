const express = require('express');
const router = express.Router();

// QUERY
const SiteQuery = require('../db/queries/siteQuery');
const LocationQuery = require('../db/queries/locactionQuery');
const UserQuery = require('../db/queries/userQuery');

// GET ALL SITES
router.get('/', async (req, res) => {
  const sites = await SiteQuery.getSites();
  res.send(sites);
});

// get ALL LOCATIONS

router.get('/:site/locations', async (req, res) => {
  const siteId = req.params.site
  const locations = await LocationQuery.getLocationsBySiteId(siteId);
  res.send(locations);
});

router.get('/user', async (req, res) => {
  const id = req.signedCookies.user || await UserQuery.getDefaultUser();
  const site = await SiteQuery.getSiteByUser(id);
  res.send(site);
})

module.exports = router;