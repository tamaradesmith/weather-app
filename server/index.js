const express = require('express');
const logger = require('morgan');
// const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

const weather = require('./routes/weather');
const auth = require('./routes/auth');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors());
app.use(logger('dev'));

app.use('/auth', auth)
app.use('/', weather);

// return errors
app.use(function(res,res, next){
  const err = new Error('Not Found');
  err.status = 404;
  console.log("err.status", err.status)
  next(err);
})
app.use(function(err, req, res, next){
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  })
})

const PORT = 4000;
const ADDRESS = '0.0.0.0';

app.listen(PORT, ADDRESS, () => {
  console.log(`Listening => port: ${PORT} Address: ${ADDRESS}`)
});