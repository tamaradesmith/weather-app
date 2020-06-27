const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const UserQuery = require('../db/queries/userQuery');
const Model = require('../model/auth')

router.get('/',  async (req, res) => {
  const id = req.signedCookies.user || await UserQuery.getDefaultUser();
  const user = await UserQuery.getOne(id);
  res.send(user[0]);

});

router.post('/signup', async (req, res, next) => {
  if (Model.validUser(req.body)) {
    const user = await UserQuery.GetByUsername(req.body.username);
    if (!user) {
      bcrypt.hash(req.body.password, 10)
        .then((hash) => {
          const newUser = {
            site_id: req.body.site,
            username: req.body.username,
            password: hash
          };
          UserQuery.create(newUser).then(id => {
            res.json({
              id,
              message: 'New user created'
            });
          });
        });
    } else {
      next(new Error('Username in use'));
    };
  } else {
    next(new Error('Invaild user'))
  };
});

router.post('/login', async (req, res, next) => {
  if (Model.validUser(req.body)) {
    UserQuery.GetByUsername(req.body.username)
      .then(user => {
        if (user) {
          console.log("user", user);
          bcrypt.compare(req.body.password, user.password).catch(error => console.log(error.message))
            .then((result) => {
              if (result) {
                const isSecure = req.app.get('env') != 'development';
                res.cookie("user", user.id, {
                  httpOnly: true,
                  secure: isSecure,
                  signed: true,
                  SameSite: 'None',
                });
                res.cookie("site", user.site, {
                  // httpOnly: true,
                  // secure: isSecure,
                  // signed: true
                });
                return res.json({
                  result,
                  message: "Logging in!"
                });
              } else {
                next(new Error("Invaild login"))
              }
            });
        } else {
          next(new Error("Invaild login"))
        }
      }).catch(error=>{
        console.log(error.message)
      });
  } else {
    next(new Error('Invaild login'))
  }
})



module.exports = router;