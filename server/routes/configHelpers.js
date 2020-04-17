const parseString = require('xml2js').parseString;
const typeSensor = { temperature: "\xB0c", pressure: "kPa", distance: 'm', speed: "m/sec", direction: "\xB0" };

module.exports = {

  getDevices(XMLFile) {
    let devicesXml;
    const devicesList = [];
    parseString(XMLFile, ((err, result) => {
      devicesXml = result.application.device
    }));
    devicesXml.map(device => {
      const sensors = this.getSensors(device.sensors[0].sensor);
      const controllers = (device.controllers[0].controller !== undefined) ? this.getControllers(device.controllers[0].controller) : [];
      const properties = (device.properties[0].property !== undefined) ? this.getProperties(device.properties[0].property) : [];
      devicesList.push({ name: device.name[0], type: device.type[0], sensors, controllers, properties })
    })
    return devicesList;
  },

  getSensors(sensorList) {
    return sensorList.map(sensor => {
      const keys = Object.keys(sensor);
      const sensorInfo = {}
      keys.forEach(key => {
        if (key !== "value") {
          sensorInfo[key] = sensor[key][0].toLowerCase()
        }
        if (typeSensor[sensorInfo[key]] != undefined && key === 'type') {
          sensorInfo.unit = typeSensor[sensorInfo[key]];
        } else if ((key === 'type')) {
          sensorInfo.unit = " ";
        }
      })
      return sensorInfo;
    })
  },
  getControllers(controllerList) {
    return controllerList.map(controller => {
      const controllerInfo = {};
      const keys = Object.keys(controller);
      keys.forEach(key => {
        if (key !== "value" && key !== 'onstring' && key !== 'offstring') {
          controllerInfo[key] = controller[key][0];
        }
      })
      return controllerInfo;
    });
  },
  getProperties(propertiesList) {
    return propertiesList.map(properties => {
      const propertiesInfo = {};
      const keys = Object.keys(properties);
      keys.forEach(key => {
        propertiesInfo[key] = properties[key][0];
      });
      return propertiesInfo;
    });
  },
}
