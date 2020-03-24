
const knex = require('knex');
const dbConfig = require("./knexfile")


const client = knex(dbConfig.development)


module.exports = client;



// // get a knex configuration, defaulting to development
// var knexConfig = mysqlConfig[process.env.NODE_ENV || 'development'];

// // initialize knex with the configuration for the environment
// var knex = require('knex')(knexConfig);

// // export the initialized knex object
// module.exports = knex;


// const environment = process.env.NODE_ENV || 'development';    // if something else isn't setting ENV, use development
// const configuration = require('./knexfile')[environment];    // require environment's settings from knexfile
// const database = require('knex')(configuration);              // connect to DB via knex using env's settings

// module.exports = database;