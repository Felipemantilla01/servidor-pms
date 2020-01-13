const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'snmp';

const findDevices = ()=>{
    return new Promise(resolve => {

        let client = new MongoClient(url, { useNewUrlParser: true,  useUnifiedTopology: true })
            client.connect(function(err, client) {
            if(err){resolve({status:'error', data:`Can't connect to the database`})}
            else{                
                const db = client.db(dbName);
                const col = db.collection('devices');                
                col.find({}).toArray(function(err, docs) {        
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


const updateDevice = (device) =>{
    return new Promise(resolve =>{
        let client = new MongoClient(url, { useNewUrlParser: true,  useUnifiedTopology: true })
            client.connect(function(err, client) {
            if(err){resolve({status:'error', data:`Can't connect to the database`})}
            else{                
                const db = client.db(dbName);
                const col = db.collection('devices');                
                col.findOneAndUpdate({deviceIp: device.deviceIp}, {$set:device}, function(err, r) {        
                    if(err){resolve({status:'error', data:`Can't update the database`}); client.close()}
                    else{
                        resolve({status:'ok', data: 'Device updated successfully'})
                        client.close()
                    }
                });
            }
        });        
    })
}


const findDeviceInfo = (deviceIp)=>{
    return new Promise(resolve => {

        let client = new MongoClient(url, { useNewUrlParser: true,  useUnifiedTopology: true })
            client.connect(function(err, client) {
            if(err){resolve({status:'error', data:`Can't connect to the database`})}
            else{                
                const db = client.db(dbName);
                const col = db.collection('devices');                
                col.find({deviceIp:deviceIp}).toArray(function(err, docs) {        
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


const insertDevice = (device) =>{
    return new Promise(resolve =>{
        let client = new MongoClient(url, { useNewUrlParser: true,  useUnifiedTopology: true })
            client.connect(function(err, client) {
            if(err){resolve({status:'error', data:`Can't connect to the database`})}
            else{                
                const db = client.db(dbName);
                const col = db.collection('devices');                
                col.insertOne(device, function(err, r) {        
                    if(err){resolve({status:'error', data:`Can't update the database`}); client.close()}
                    else{
                        resolve({status:'ok', data: 'Device inserted successfully'})
                        client.close()
                    }
                });
            }
        });        
    })
}

const deleteDevice = (deviceIp) =>{
    return new Promise(resolve =>{
        let client = new MongoClient(url, { useNewUrlParser: true,  useUnifiedTopology: true })
            client.connect(function(err, client) {
            if(err){resolve({status:'error', data:`Can't connect to the database`})}
            else{                
                const db = client.db(dbName);
                const col = db.collection('devices');                
                col.deleteOne({deviceIp:deviceIp}, function(err, r) {        
                    if(err){resolve({status:'error', data:`Can't delete the device`}); client.close()}
                    else{
                        resolve({status:'ok', data: 'Device deleted successfully'})
                        client.close()
                    }
                });
            }
        });        
    })
}



exports.updateDevice = updateDevice
exports.findDevices = findDevices
exports.findDeviceInfo = findDeviceInfo
exports.insertDevice = insertDevice
exports.deleteDevice = deleteDevice