
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
