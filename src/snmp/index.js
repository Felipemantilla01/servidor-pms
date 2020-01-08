
const snmpClient = require('./snmp.functions')


let oids = require('../../db/schema.config.json')
var vars = oids.devices.MIB.var
var consts = oids.devices.MIB.const


console.log(vars)
console.log(consts)

async function main() {
var result = await snmpClient.getSnmpValue(consts.sysDescription, '10.41.14.6')
    console.log(result) 
}
main()






