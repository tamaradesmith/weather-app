const knex = require("../../client");

module.exports = {
  async getDisplaySensors(type, user) {
    const sensors = await knex("displays")
      .select('display_sensor_items.sensor_id', 'display_sensor_items.html_id')
      .where({ type: type, user_id: user })
      .join('display_sensor_items', 'displays.id', 'display_id');
    const result = {};
    sensors.map(sensor => {
      result[sensor.html_id] = sensor.sensor_id;
      return result;
    })
    return result
  },
  async getUserDisplay(user) {
    const displays = await knex('displays')
      .select('displays.type as display', 'display_sensor_items.html_id as name', 'display_sensor_items.sensor_id', 'displays.id', 'sensor_types.type as type', 'sensors.name as sensor', 'sub_types.sub_type')
      .where({ user_id: user })
      .join('display_sensor_items', 'displays.id', 'display_id')
      .join('sensors', 'sensors.id', 'display_sensor_items.sensor_id')
      .join('sensor_types', 'sensors.type_id', 'sensor_types.id')
      .join('sub_types', 'sensors.sub_type_id', 'sub_types.id')
      .groupBy('displays.id', 'display_sensor_items.id',"sub_types.sub_type", 'sensor_types.type', 'sensors.name',  );
    const result = {};
    displays.forEach(item => {
      if (item.display in result) {
        const display = result[item.display];
        display.push(item);
      } else {
        result[item.display] = [item];
      }
    });
    return result
  }
}