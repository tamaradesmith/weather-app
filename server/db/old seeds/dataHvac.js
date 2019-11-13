const knex = require('../../client')



// {
//   node: 'hvac',
//     device: 'mcp1',
//       sensor: 'temperature',
//         date: '2019/10/09 18:31:30',
//           value: '22.250'
// }



// knex("nodes")
//     .insert({ name: "hvac", description: "HVAC control and monitoring node", ipaddress: '192.168.1.202', type: "huzzah"})
//     .then(() => {
//         knex.destroy()
//         console.log("finished Nodes")
//     });



// knex('nodes')
//     .select('id')
//     .where({ name: "hvac" })
//     .then((data) => {
//         console.log(data[0].id)
//         return knex('devices').insert([
//             { name: 'inside', description: "Inside monitoring sensor", node_id: data[0].id, type: "mcp90808" }, { name: 'outside', description: "outdoor monitoring sensor", node_id: data[0].id, type: "mcp90808" }, { name: 'processor', description: "processor for fan, heater and cooler units", node_id: data[0].id, type: "" }
//         ]).then((data) => {
//             knex.destroy()
//             console.log("finished device")
//         });
//     })

// knex('devices')
//     .select('id')
//     .where({ name: "inside" })
//     .then((data) => {
//         devices_id = data[0].id
//         knex("sensors")
//             .insert([
//                 { name: "temperature", type: "temperature", maxValue: "125.000", minValue: "-40.000", unit: "C", device_id: devices_id, location: "main cabin", propose: "read temperature inside RV's main cabin" },
//             ]).returning('*').then((e) => {
//                 console.log(e)
//                 knex.destroy();
//             })
//     })


// knex('devices')
//     .select('id')
//     .where({ name: "outside" })
//     .then((data) => {
//         devices_id = data[0].id
//         knex("sensors")
//             .insert([
//               { name: "temperature", type: "temperature", maxValue: "125.000", minValue: "-40.000", unit: "C", device_id: devices_id, location: "weather station", propose: "read outside temperature" },
//             ]).returning('*').then((e) => {
//                 console.log(e)
//                 knex.destroy();
//             })
//     })


knex('nodes')
    .select('id')
    .where({ name: "hvac" })
    .then((data) => {
        knex('devices')
            .select('id')
            .where({ node_id: data[0].id, name: "processor" })
            .then((data) => {
                devices_id = data[0].id
                knex("controllers")
                    .insert([
                        { name: "ac", type: "boolean", device_id: devices_id },
                        { name: "heater", type: "boolean", device_id: devices_id },
                        { name: "fan", type: "boolean", device_id: devices_id },

                    ]).returning('type').then((e) => {
                        console.log(e)
                        knex.destroy();
                    })
            })
        })


// knex('contro')
// .where("id", 8)
// .update({name: "inside"})
// .then(data =>{
//   console.log(data);
//   knex.destroy()
// })

// knex('controllers')
//   .where("id", 10)
//   .delete()
//   .then(data => {
//     console.log(data);
//     knex.destroy()
//   })