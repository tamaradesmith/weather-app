const knex = require("../client");


async function reading() {
  const reading = await knex('readings').select('value', "time", "sensor_id").where({ sensor_id: 15 }).catch(err => {
    console.log(err)
  })
  console.log("TCL: reading -> reading", reading)
  return reading;

};

reading()