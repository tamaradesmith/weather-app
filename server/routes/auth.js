const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();


// const app = express();
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());


const User = require('../db/queries/userQuery')



function validUser(user) {
  // const vaildEmail = typeof user.email == 'string'// && user.email.trim() != "";
  const vaildPassword = typeof user.password == 'string'  && user.password.trim().length >= 6;  //&& user.email.trim() != ""
  return vaildPassword;  //vaildEmail && 
}


router.get('/', (req, res) => {
  console.log("meow")
  res.send("meow");
});

router.post('/signup', async (req, res, next) => {
  if (validUser(req.body)) {
    const user = await User.GetByUsername(req.body.username);
    if (!user) {
      bcrypt.hash(req.body.password, 10)
        .then((hash) => {
          const newUser = {
            site_id: req.body.site,
            username: req.body.username,
            password: hash
          }
          User.create(newUser).then(id => {
            res.json({
              id,
              message: 'Good Kitten'
            });
          })
        });
    } else {
      next(new Error('Email in Use'));
    }
  } else {
    next(new Error('Invaild user'))
  }
})

router.post('/login', async (req, res, next) => {
  if (validUser(req.body)) {
    User.GetOneByEmail(req.body.email)
      .then(user => {
        if (user) {
          bcrypt.compare(req.body.password, user.password)
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
      });
  } else {
    next(new Error('Invaild login'))
  }
})



module.exports = router;