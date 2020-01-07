
const snmpClient = require('./snmp.functions')


let oids = require('../../db/schema.config.json')
var pmsPv20AVars = oids.devices.PMS_PV_20A.MIB.var
var pmsPv20AConsts = oids.devices.PMS_PV_20A.MIB.const


console.log(pmsPv20AVars)

async function main() {
var result = await snmpClient.getSnmpValue(pmsPv20AVars.batteryVoltage, '10.41.14.6')
    console.log(result) 
}
main()






