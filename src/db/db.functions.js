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

exports.findDevices = findDevices