var snmp = require('snmp-native');
let debugLevel = 5; 
/* level 5 shows the log from errors throw the methods from SNMP */

const getSnmpValue = (oid,ip) =>{
    return new Promise(resolve => {
        var session = new snmp.Session({ host: ip, family: 'udp4', community: 'public' });
        session.get({ oid: oid }, function (error, varbinds) {
            if (error) {

                if(debugLevel>4){console.log({status:'error', data:`Can't read the OID: ${oid} from device ${ip}`});}
                session.close();
                resolve({status:'error', data:`Can't read the OID: ${oid} from device ${ip}`})
            } else {                                
                session.close();                
                resolve({status:'ok', data : {oid:varbinds[0].oid, value: varbinds[0].value}, type: varbinds[0].type })
            }
        });
    })
}


const getAll = (oids,ip) => {
    return new Promise(resolve => {
        
    })
}

exports.getSnmpValue = getSnmpValue