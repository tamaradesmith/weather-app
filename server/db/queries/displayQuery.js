const knex = require("../../client");

module.exports = {
  async getDisplaySensors(type, user) {
    const sensors = await knex("displays")
      .select('display_sensor_items.sensor_id', 'display_sensor_items.html_id')
      .where({ type: type, user_id: user })
      .join('display_sensor_items', 'displays.id', 'display_id');
    return sensors
  },

}