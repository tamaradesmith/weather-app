const parseString = require('xml2js').parseString;

module.exports = { 
  getNodeDependent(XMLFile){
    let devicesXml;
    const devicesList=[];
   parseString(file, ((err, result) =>{
     devicesXml = result.application.device
    }));
    
 const list =  devicesXml.map(device => {
      const deviceObject = this.getDevice(device);
      devicesList.push(deviceObject)
    });
    return devicesList;
  },
  getDevice(device){
    const deviceObject = { name: device.name[0], type: device.type[0] }
    // if (device.sensors[0].length > 0){
    this.getSenors(device.sensors[0]);
    // };
    return deviceObject;
  },
  getSenors(sensorList){
    console.log("TCL: getSenors -> sensorList", sensorList.sensor[0])


  }
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
    <controllers>
    </controllers>
    <properties>
    </properties>
  </device>
  <device><name>TEST_SI1145</name><type>SI1145</type><sensors><sensor>
    <name>Visible</name><type>Range</type><min>0.000000</min><max>1000.000000</max><value>-100000.000000</value></sensor>
    <sensor><name>IR</name><type>Range</type><min>0.000000</min><max>1000.000000</max><value>-100000.000000</value></sensor>
    <sensor><name>UVIndex</name><type>Range</type><min>-100.000000</min><max>200.000000</max><value>-100000.000000</value></sensor>
    <sensor><name>Proximity</name><type>Range</type><min>-100.000000</min><max>200.000000</max><value>-100000.000000</value></sensor>\
    </sensors><controllers><controller><name>IrLed</name><type>Boolean</type><onstring>ON</onstring><offstring>OFF</offstring>
      <value>ON</value></controller></controllers><properties></properties></device> <device><name>Outside_Ambient</name>
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
    