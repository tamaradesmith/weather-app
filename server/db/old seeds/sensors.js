
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('sensors').del()
    .then(function () {
      // Inserts seed entries
      return knex('devices')
        .select('id')
        .where({ name: "colour" })
        .then((data) => {
          console.log("TCL: exports.seed -> data", data)
          devices_id = data[0].id
        return  knex("sensors")
            .insert([
              { name: "red", type: "range", minValue: "0.000", maxValue: "1023.000", device_id: devices_id, propose: "read outside tempature", location: "Weather Station" },
              { name: "green", type: "range", minValue: "0.000", maxValue: "1023.000", device_id: devices_id, propose: "read inside tempature", location: "Inside RV Main Cabin" },
              { name: "blue", type: "range", minValue: "0.000", maxValue: "1023.000", device_id: devices_id, propose: "read inside tempature", location: "Inside RV Bedroom" },
              { name: "clear", type: "range", minValue: "0.000", maxValue: "1023.000", device_id: devices_id, propose: "Wind direction", location: "Weather Station" },
              { name: "lux", type: "range", minValue: "0.000", maxValue: "1023.000", device_id: devices_id, propose: "Wind speed", location: "Weather Station" },
              { name: "cct", type: "range", minValue: "0.000", maxValue: "100000.000", device_id: devices_id, propose: "read inside humidity", location: "Inside Main Cabin" },
            ])
        })
    });
};

// MAIN CAbin
// [{ value: 18, time: 2020-01-20T15: 00: 30.000Z, sensor_id: 15 },
//   { value: 21, time: 2020 - 01 - 20T20: 00: 30.000Z, sensor_id: 15 },
//   { value: 22, time: 2020 - 01 - 21T00: 00: 30.000Z, sensor_id: 15 },
//   { value: 20, time: 2020 - 01 - 21T04: 00: 30.000Z, sensor_id: 15 },
//   { value: 18, time: 2020 - 01 - 21T08: 00: 30.000Z, sensor_id: 15 },
//   { value: 16, time: 2020 - 01 - 21T15: 00: 30.000Z, sensor_id: 15 },
//   { value: 20, time: 2020 - 01 - 21T20: 00: 30.000Z, sensor_id: 15 },
//   { value: 22, time: 2020 - 01 - 22T00: 00: 30.000Z, sensor_id: 15 },
//   { value: 21, time: 2020 - 01 - 22T04: 00: 30.000Z, sensor_id: 15 },
//   { value: 17, time: 2020 - 01 - 22T08: 00: 30.000Z, sensor_id: 15 }]