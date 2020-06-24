const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const User = require('../db/queries/userQuery');
const Model = require('../model/auth')

router.get('/', (req, res) => {
  res.send("sign in");
});

router.post('/signup', async (req, res, next) => {
  if (Model.validUser(req.body)) {
    const user = await User.GetByUsername(req.body.username);
    if (!user) {
      bcrypt.hash(req.body.password, 10)
        .then((hash) => {
          const newUser = {
            site_id: req.body.site,
            username: req.body.username,
            password: hash
          };
          User.create(newUser).then(id => {
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
    User.GetByUsername(req.body.username)
      .then(user => {
        if (user) {
          console.log("user", user);
          bcrypt.compare(req.body.password, user.password).catch(error => console.log(error.message))
            .then((result) => {
              if (result) {
                const isSecure = req.app.get('env') != 'development';
                res.cookie("user_id", user.id, {
                  httpOnly: true,
                  secure: isSecure,
                  signed: true
                });
                res.cookie("site", user.site, {
                  httpOnly: true,
                  secure: isSecure,
                  signed: true
                });
                return res.json({
                  result,
                  message: "Logging in!"
                });
              } else {
                next(new Error("Invaild login..."))
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