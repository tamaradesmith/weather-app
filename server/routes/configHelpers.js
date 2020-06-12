const parseString = require('xml2js').parseString;
const typeSensor = { temperature: "\xB0c", pressure: "kPa", distance: 'm', speed: "m/sec", direction: "\xB0" };

module.exports = {

  getDevices(XMLFile) {
    let devicesXml;
    XMLFile =file;
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


const file = `<application>
  < name > Device</name>
    <version>Feb 14 2020 15:06:00</version>
    <date>Feb 14 2020 15:06:00</date>
    <device>
      <name>BMP280</name>
      <type>BMP280</type>
      <sensors>
        <sensor>
          <name>Temperature</name>
          <type>Temperature</type>
          <url>rest/sensors/BMP280/Temperature</url>
          <min>-40.000000</min>
          <max>85.000000</max>
          <unit>C</unit>
        </sensor>
        <sensor>
          <name>Pressure</name>
          <type>Pressure</type>
          <url>rest/sensors/BMP280/Pressure</url>
          <min>30000.000000</min>
          <max>110000.000000</max>
          <unit>kPa</unit>
        </sensor>
        <sensor>
          <name>Altitude</name>
          <type>Distance</type>
          <url>rest/sensors/BMP280/Altitude</url>
          <min>-500.000000</min>
          <max>9000.000000</max>
          <unit>M</unit>
        </sensor>
      </sensors>
      <controllers />
      <properties>
        <property>
          <name>SealLevelPressure</name>
          <type>Pressure</type>
          <url>rest/properties/BMP280/SealLevelPressure</url>
          <min>30000.000000</min>
          <max>110000.000000</max>
          <unit>kPa</unit>
        </property>
      </properties>
    </device>
    <device>
      <name>SGP30</name>
      <type>SGP30</type>
      <sensors>
        <sensor>
          <name>CO2</name>
          <type>PPM</type>
          <url>rest/sensors/SGP30/CO2</url>
          <min>0.000000</min>
          <max>100000.000000</max>
          <unit> </unit>
        </sensor>
        <sensor>
          <name>Raw H2</name>
          <type>Range</type>
          <url>rest/sensors/SGP30/Raw H2</url>
          <min>0.000000</min>
          <max>100000.000000</max>
          <unit> </unit>
        </sensor>
        <sensor>
          <name>Raw Ethanol</name>
          <type>Range</type>
          <url>rest/sensors/SGP30/Raw Ethanol</url>
          <min>0.000000</min>
          <max>100000.000000</max>
          <unit> </unit>
        </sensor>
      </sensors>
      <controllers />
      <properties>
        <property>
          <name>eCO2Baseline</name>
          <type>Range</type>
          <url>rest/properties/SGP30/eCO2Baseline</url>
          <min>0.000000</min>
          <max>65535.000000</max>
          <unit> </unit>
        </property>
        <property>
          <name>eTvocBaseline</name>
          <type>Range</type>
          <url>rest/properties/SGP30/eTvocBaseline</url>
          <min>0.000000</min>
          <max>65535.000000</max>
          <unit> </unit>
        </property>
      </properties>
    </device>
    <device>
      <name>ESP</name>
      <type>Motherboard</type>
      <sensors>
        <sensor>
          <name>Analog</name>
          <type>Percent</type>
          <url>rest/sensors/ESP/Analog</url>
          <min>0.000000</min>
          <max>1.000000</max>
          <unit>%</unit>
        </sensor>
      </sensors>
      <controllers>
        <controller>
          <name>GPIO0</name>
          <type>Percent</type>
          <url>rest/controllers/ESP/GPIO0</url>
          <min>0.000000</min>
          <max>1.000000</max>
          <unit>%</unit>
        </controller>
        <controller>
          <name>GPIO2</name>
          <type>Percent</type>
          <url>rest/controllers/ESP/GPIO2</url>
          <min>0.000000</min>
          <max>1.000000</max>
          <unit>%</unit>
        </controller>
        <controller>
          <name>GPIO12</name>
          <type>Boolean</type>
          <url>rest/controllers/ESP/GPIO12</url>
          <true>Black</true>
          <false>Red</false>
          <unit> </unit>
        </controller>
        <controller>
          <name>GPIO15</name>
          <type>Boolean</type>
          <url>rest/controllers/ESP/GPIO15</url>
          <true>OFF</true>
          <false>ON</false>
          <unit> </unit>
        </controller>
      </controllers>
      <properties />
    </device>
</application >`