const express = require('express');
const router = express.Router();


const app = express();
const weather = require('./routes/weather');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors());
app.use(logger('dev'));

app.use(weather);


const PORT = '0.0.0.0';
const ADDRESS = "localhost";

app.listen(PORT, ADDRESS, ()=>{
  console.log(`Listening`)
});

module.exports = router;