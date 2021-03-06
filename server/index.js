const express = require('express');
const logger = require('morgan');
// const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const methodOverride = require('method-override');

const authMiddleware = require('./routes/middleware');

const app = express();


const dotenv = require('dotenv');
dotenv.config();


//  Route files
const node = require('./routes/node');
const auth = require('./routes/auth');
const sensor = require('./routes/sensor');
const device = require('./routes/device');
const controller = require('./routes/controller');
const proptery = require('./routes/proptery');
const site = require('./routes/site');
const display = require('./routes/display');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(methodOverride((req, res) => {
  if (req.body && req.body._method) {
    const method = req.body._method;
    return method;
  };
}));

app.use(logger('dev'));
// app.use(cookieParser('keyboard_cat'));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors({
  origin: 'http://localhost:8081',
  credentials: true,
}));


// ROUTES 

app.use('/auth', auth);
app.use('/nodes', node);
app.use('/sensors', sensor);
app.use('/devices', device);
app.use('/controllers', controller);
app.use('/properties', proptery);
app.use('/sites', site);
app.use('/display', display);

// ERRORS

app.use(function (res, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });

});

// SERVER

const PORT = 4000;
const ADDRESS = '0.0.0.0';

app.listen(PORT, ADDRESS, () => {
  console.log(`Listening => Port: ${PORT}`)
});