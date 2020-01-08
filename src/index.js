let dbClient = require('./db/db.functions')
let snmpClient = require('./snmp/snmp.functions')
let icmpClient = require('./ping/ping.functions')
let configDevices = require('../db/schema.config.json')

async function main() {

    let devices = await dbClient.findDevices()
    if(devices.status!='error'){
        devices.data.forEach(async device => {

            let comState = await icmpClient.ping(device.deviceIp)
            if(comState.isAlive){
                let batteryVoltage = await snmpClient.getSnmpValue(configDevices.devices.MIB.var.batteryVoltage, device.deviceIp)
                let batteryCurrent = await snmpClient.getSnmpValue(configDevices.devices.MIB.var.batteryCurrent, device.deviceIp)
                let panelVoltage = await snmpClient.getSnmpValue(configDevices.devices.MIB.var.panelVoltage, device.deviceIp)
                let panelCurrent = await snmpClient.getSnmpValue(configDevices.devices.MIB.var.panelCurrent, device.deviceIp)
                let temperature = await snmpClient.getSnmpValue(configDevices.devices.MIB.var.temperature, device.deviceIp)
                let sysUpTime = await snmpClient.getSnmpValue(configDevices.devices.MIB.var.sysUpTime, device.deviceIp)
                let sysName = await snmpClient.getSnmpValue(configDevices.devices.MIB.const.sysName, device.deviceIp)
                let sysDescription = await snmpClient.getSnmpValue(configDevices.devices.MIB.const.sysDescription, device.deviceIp)
                let sysLocation = await snmpClient.getSnmpValue(configDevices.devices.MIB.const.sysLocation, device.deviceIp)
                
                let deviceVars = {
                    deviceIp : device.deviceIp,
                    deviceName : device.deviceName,
                    comState: comState.isAlive,
                    batteryVoltage: batteryVoltage.data.value,
                    batteryCurrent: batteryCurrent.data.value,
                    panelVoltage: panelVoltage.data.value,
                    panelCurrent: panelCurrent.data.value,
                    temperature: temperature.data.value,
                    sysUpTime: sysUpTime.data.value,
                    sysName:sysName.data.value,
                    sysDescription:sysDescription.data.value,
                    sysLocation:sysLocation.data.value
                }                
                console.log(deviceVars)
                let res = await dbClient.updateDevice(deviceVars)
                
            }                        
            //console.log(response)
        });
    }    
}
main()