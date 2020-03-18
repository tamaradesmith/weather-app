
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('readings').del()
    .then(function () {
      // Inserts seed entries
      return knex('readings').insert([
        { value: 21, time: '01/01/2020 12:00:00pm', sensor_id: 1 },
        { value: 22, time: '01/01/2020 12:30:00pm', sensor_id: 1 },
        { value: 23, time: '01/01/2020 1:00:00pm', sensor_id: 1 },
        { value: 20, time: '01/01/2020 1:30:00pm', sensor_id: 1 },
        { value: 20, time: '01/01/2020 2:00:00pm', sensor_id: 1 },
        { value: 19, time: '01/01/2020 2:30:00pm', sensor_id: 1 },
        { value: 18, time: '01/01/2020 3:00:00pm', sensor_id: 1 },
        { value: 20, time: '01/01/2020 3:30:00pm', sensor_id: 1 },
        { value: 21, time: '01/01/2020 4:00:00pm', sensor_id: 1 },
        { value: 22, time: '01/01/2020 4:30:00pm', sensor_id: 1 },
        { value: 23, time: '01/01/2020 5:00:00pm', sensor_id: 1 },
        { value: 19, time: '01/01/2020 5:30:00pm', sensor_id: 1 },
        { value: 20, time: '01/01/2020 6:00:00pm', sensor_id: 1 },
        { value: 21, time: '01/01/2020 6:30:00pm', sensor_id: 1 },
        { value: 22, time: '01/01/2020 7:00:00pm', sensor_id: 1 },
        { value: 20, time: '01/01/2020 7:30:00pm', sensor_id: 1 },
        { value: 20, time: '01/01/2020 8:00:00pm', sensor_id: 1 },
        { value: 19, time: '01/01/2020 8:30:00pm', sensor_id: 1 },
        { value: 18, time: '01/01/2020 9:00:00pm', sensor_id: 1 },
        { value: 17, time: '01/01/2020 9:30:00pm', sensor_id: 1 },
        { value: 17, time: '01/01/2020 10:00:00pm', sensor_id: 1 },
        { value: 18, time: '01/01/2020 10:30:00pm', sensor_id: 1 },
        { value: 19, time: '01/01/2020 11:00:00pm', sensor_id: 1 },
        { value: 18, time: '01/01/2020 11:30:00pm', sensor_id: 1 },
        { value: 16, time: '01/01/2020 12:00:00am', sensor_id: 1 }
      ])
    })
}
