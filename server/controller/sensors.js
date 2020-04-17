// update April 16, 2020

const knex = require('../client');
const axois = require('axios');


async function getNodeIp(id){
  const result = await knex("nodes").select("ipaddress").where({id});
  return result;
}
async function getAllTempatureSensors(){
  // const result = await knex("sensors"). 
} 


async function getSensorReading(){
  const ip = await getNodeIp(7);

  const address = `${ip}/api/sensors/${device}/${sensor}`
  // api / sensors / bmp280 / temperature /
  console.log("getReading -> ip", ip)
  
}





getSensorReading()