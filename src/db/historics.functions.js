const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'snmp';


const setNewData = (device) =>{
    
    return new Promise(resolve =>{
        let client = new MongoClient(url, { useNewUrlParser: true,  useUnifiedTopology: true })
            client.connect(function(err, client) {
            if(err){resolve({status:'error', data:`Can't connect to the database`})}
            else{                
                const db = client.db(dbName);            
                
                db.collection(`${device.deviceIp}`).insertOne(device, function(err, r) {
                    if(err){resolve({status:'error',data: `Can't insert information (historics) for ${device.deviceIp}`})}
                    else{
                        resolve({status:'ok', data:`Information insert to historics for ${device.deviceIp}`})
                    }
                })            
            }
        });        
    })
}

const findDeviceHistorics = (deviceIp, rangeDate)=>{
    return new Promise(resolve => {

        let client = new MongoClient(url, { useNewUrlParser: true,  useUnifiedTopology: true })
            client.connect(function(err, client) {
            if(err){resolve({status:'error', data:`Can't connect to the database`})}
            else{                
                const db = client.db(dbName);
                const col = db.collection(`${deviceIp}`);                
                col.find(
                    {
                        lastTime:{
                                    $gte : new Date(rangeDate.initialDate),
                                    $lt : new Date(rangeDate.finalDate)
                                }   
        }).toArray(function(err, docs) {        
                    if(err){resolve({status:'error', data:`Can't read the database`}); client.close()}
                    else{
                        resolve({status:'ok', data: docs})
                        client.close()
                    }
                });
            }
        });
    })
}



exports.setNewData = setNewData
exports.findDeviceHistorics = findDeviceHistorics