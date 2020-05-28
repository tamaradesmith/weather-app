const express = require('express');
const logger = require('morgan');
// const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const methodOverride = require('method-override');
const app = express();

//  Route files
const weather = require('./routes/weather');
const auth = require('./routes/auth');
const sensor = require('./routes/senor');
const device = require('./routes/device');
const controller = require('./routes/controller');
const proptery = require('./routes/proptery');



app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride((req, res) => {
  if (req.body && req.body._method) {
    const method = req.body._method;
    return method;
  };
}));

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json())
app.use(logger('dev'));
app.use(cookieParser('keyboard_cat'));
// app.use(cookieParser(process.env.COOKIE_SECRET));
// app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


// ROUTES 

app.use('/auth', auth);
app.use('/nodes', weather);
app.use('/sensors', sensor);
app.use('/devices', device);
app.use('/controllers', controller);
app.use('/propteries', proptery);


// ERRORS

app.use(function (res, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  console.log("err.status", err.status)
  next(err);
})
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  })
})

// SERVER

const PORT = 4000;
const ADDRESS = '0.0.0.0';

app.listen(PORT, ADDRESS, () => {
  console.log(`Listening => Port: ${PORT} Address: ${ADDRESS}`)
});