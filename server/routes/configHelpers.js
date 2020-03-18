const parseString = require('xml2js').parseString;
const typeSensor = { temperature: "\xB0c", pressure: "kPa", distance: 'm', speed: "m/sec", direction: "\xB0"};

module.exports = {

  getDevices(XMLFile) {
    let devicesXml;
    XMLFile = file
    const devicesList = [];
    parseString(file, ((err, result) => {
      devicesXml = result.application.device
    }));
    devicesXml.map(device => {
      const sensors = this.getSensors(device.sensors[0].sensor);
      const controllers = (device.controllers[0].controller !== undefined) ? this.getControllers(device.controllers[0].controller) : [];
      devicesList.push({ name: device.name[0], type: device.type[0], sensors: sensors, controllers: controllers, properties: device.properties[0] })
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
        if (typeSensor[sensorInfo[key]] != undefined && key === 'type' ) {
          sensorInfo.unit = typeSensor[sensorInfo[key]];
        } else if ((key === 'type')) {
          sensorInfo.unit = " ";
        }
      })
      console.log("getSensors -> sensorInfo", sensorInfo)
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
  getProperties(propertiesList, node) {
    return propertiesList.properties.map(properties => {
      const propertiesInfo = { location: node.location };
      const keys = Object.keys(properties);
      keys.forEach(key => {
        propertiesInfo[key] = properties[key][0];
      });
      return propertiesInfo;
    });
  },
}


const file = `<?xml version = "1.0" encoding="UTF - 8"?>
< application >
  <name>Devices</name>
  <device>
    <name>Test_BMP280</name>
    <type>BMP280</type>
    <sensors>
      <sensor>
        <name>Temperature</name>
        <type>Temperature</type>
        <min>-40.000000</min>
        <max>85.000000</max>
        <value>-1000000.000000</value>
      </sensor>
      <sensor>
        <name>Pressure</name>
        <type>Pressure</type>
        <min>30000.000000</min>
        <max>110000.000000</max>
        <value>-1000000.000000</value>
      </sensor>
      <sensor>
        <name>Altitude</name>
        <type>Distance</type>
        <min>-500.000000</min>
        <max>9000.000000</max>
        <value>-1000000.000000</value>
      </sensor>
    </sensors>
    <controllers></controllers>
    <properties></properties>
  </device>
  <device>
    <name>TEST_SI1145</name>
    <type>SI1145</type>
    <sensors>
      <sensor>
        <name>Visible</name>
        <type>Range</type>
        <min>0.000000</min>
        <max>1000.000000</max>
        <value>-100000.000000</value>
      </sensor>
      <sensor>
        <name>IR</name>
        <type>Range</type>
        <min>0.000000</min>
        <max>1000.000000</max>
        <value>-100000.000000</value>
      </sensor>
      <sensor>
        <name>UVIndex</name>
        <type>Range</type>
        <min>-100.000000</min>
        <max>200.000000</max>
        <value>-100000.000000</value>
      </sensor>
      <sensor>
        <name>Proximity</name>
        <type>Range</type>
        <min>-100.000000</min>
        <max>200.000000</max>
        <value>-100000.000000</value>
      </sensor>
      </sensors>
      <controllers>
        <controller>
          <name>IrLed</name>
          <type>Boolean</type>
          <onstring>ON</onstring>
          <offstring>OFF</offstring>
          <value>ON</value>
        </controller>
        </controllers>
        <properties></properties>
      </device>
     

      <device><name>Outside_Ambient</name>
        <type>BMP280</type><sensors><sensor><name>Temperature</name><type>Temperature</type><min>-40.000000</min><max>125.000000</max>
          <value>-100000.000000</value></sensor></sensors><controllers></controllers><properties></properties></device> <device><name>Panel_1</name>
            <type>BMP280</type><sensors><sensor><name>Temperature</name><type>Temperature</type><min>-40.000000</min><max>125.000000</max>
              <value>-100000.000000</value></sensor></sensors><controllers></controllers><properties></properties></device> <device><name>Panel_2</name>
                <type>BMP280</type><sensors><sensor><name>Temperature</name><type>Temperature</type><min>-40.000000</min><max>125.000000</max>
                  <value>-100000.000000</value></sensor></sensors><controllers></controllers><properties></properties></device> <device>
                    <name>Inside_Ambient</name><type>BMP280</type><sensors><sensor><name>Temperature</name><type>Temperature</type><min>-40.000000</min>
                      <max>125.000000</max><value>-100000.000000</value></sensor></sensors><controllers></controllers><properties></properties></device>
  <device><name>Coolent</name><type>BMP280</type><sensors><sensor><name>Temperature</name><type>Temperature</type><min>-40.000000</min>
    <max>125.000000</max><value>-100000.000000</value></sensor></sensors><controllers></controllers><properties></properties></device>
  <device><name>TEST_CCS811</name><type>BMP280</type><sensors><sensor><name>CO2</name><type>PPM</type><min>0.000000</min>
    <max>200000000.000000</max><value>-100000.000000</value></sensor><sensor><name>Tvoc</name><type>PPM</type><min>0.000000</min>
      <max>200000000.000000</max><value>-100000.000000</value>
    </sensor></sensors><controllers></controllers><properties></properties></device></application >`
