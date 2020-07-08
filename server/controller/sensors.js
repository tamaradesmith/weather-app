// update April 7, 2020 commented out july 7

// const axois = require('axios');

// const SensorQuery = require('../db/queries/sensorQuery');
// const NodeQuery = require('../db/queries/nodeQuery');
// const DeviceQuery = require('../db/queries/deviceQuery')


// Get BY TYPE

// async function getSensorsByTypeByNodeSite(site, type) {
//   const nodes = await getNodeBySite(site);
//   const NodesWithDevice = await getDevicesOnNodes(nodes);
//   const sensors = await getSensorsByDevicesIdAndSensorType(NodesWithDevice, type);
//   getReadingsforSensors(sensors);
// };

// //  TYPES



// // NODE FUNCTIONS

// async function getNodeBySite(site) {
//   const nodes = await NodeQuery.getNodesBySite(site);
//   return nodes;
// };

// // DEVICE FUNCTION

// async function getDevicesByNodeId(nodeId) {
//   return await DeviceQuery.getDevicesByNodeId(nodeId);
// }

// // return an Array of node objects with node id and ip and list of devices;  
// async function getDevicesOnNodes(nodes) {
//   const devices = await Promise.all(nodes.map(async node => {
//     const device = await getDevicesByNodeId(node.id);
//     return [{ node: node.id, ipaddress: node.ipaddress, devices: device }]
//   }))
//   return devices[0];
// }

// // SENSOR FUNCTIONS

// // get array of sensors with completed url
// async function getSensorsByDevicesIdAndSensorType(nodes, type) {
//   const result = []
//   await Promise.all(nodes.map(async node => {
//     return await Promise.all(node.devices.map(async device => {
//       const sensor = await SensorQuery.getSensorsByTypeAndDeviceId(type, device.id)
//       if (sensor !== undefined) {
//         sensor.url = `http://${node.ipaddress}/${sensor.url}`
//         result.push(sensor);
//       };
//       return;
//     }));
//   }));
//   return result;
// };


// // READING FUNCTIONS 
// function getReadingsforSensors(sensors) {
//   sensors.forEach((sensor, index) => {
//     setTimeout(async () => {
//       getReadingFromSensor(sensor);
//     }, index * 100);
//   });
//   return
// }

// async function getReadingFromSensor(sensor) {
//   const readingData = await axois.get(sensor.url).catch(err => {
//     // console.log(`${sensor.id}: ${new Date()} error`);
    
//   });
//   if (readingData !== undefined && checkstatus(readingData.data).toLowerCase() === "ok") {
//     const value = getValue(readingData.data);
//     const reading = { value, sensor_id: sensor.id, time: new Date() }
//     const read = await SensorQuery.createReading(reading);
//     // console.log("getReadingFromSensor -> read", read);

//   }
//   return
// }
// function checkstatus(data) {
//   const start = data.indexOf("<statusmessage>");
//   const end = data.indexOf("</statusmessage>");
//   return data.substring(start + 15, end);
// }

// function getValue(data) {
//   const start = data.indexOf("<value>");
//   const end = data.indexOf("</value>");
//   return data.substring(start + 7, end);
// }


