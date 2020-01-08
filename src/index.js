let dbClient = require('./db/db.functions')
let snmpClient = require('./snmp/snmp.functions')
let icmpClient = require('./ping/ping.functions')
let configDevices = require('../db/schema.config.json')

async function main() {

    let devices = await dbClient.findDevices()
    if(devices.status!='error'){
        devices.data.forEach(async device => {

            let comState = await icmpClient.ping(device.deviceIp) 
            //console.log(`device ${device.deviceIp} comunication state: ${comState.isAlive}`)
            let response = await snmpClient.getSnmpValue(configDevices.devices.MIB.var.batteryVoltage, device.deviceIp)
            //console.log(response)
        });
    }

    
}
main()