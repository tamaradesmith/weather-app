
const express = require('express');
const router = express.Router();

const DisplayQuery = require('../db/queries/displayQuery');
const SiteQuery = require('../db/queries/siteQuery');
const UserQuery = require('../db/queries/userQuery')

router.get('/:type', async (req, res) => {
  const user = req.signedCookies.user ||await UserQuery.getDefaultUser();
  const { type } = req.params;
  const sensors = await DisplayQuery.getDisplaySensors(type, user)
  const getSite = await SiteQuery.getSiteByUser(user);
  sensors.site= getSite[0].name;
  return res.send(sensors);
});

router.get('/user/index', async (req, res) =>{
  const user = req.signedCookies.user;
  const displays = await DisplayQuery.getUserDisplay(user)
  return res.send(displays);
})

module.exports = router;
