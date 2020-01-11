const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017';// Connection URL


let devices = require('../db/devices.basics.json')

//console.log(devices)

devices.forEach(async device => {
    await addNewDevice(device.deviceIp,device.deviceName)
    });


//addNewDevice()


async function addNewDevice(ip,name){
    const client = await MongoClient.connect(url, { useNewUrlParser: true,  useUnifiedTopology: true })
        .catch(err => { console.log(err); });
    if (!client) {
        return;
    }
    try {
        const db = client.db("snmp");
        let collection = db.collection('devices');
        await collection.insertOne(
            {
                "deviceIp" : ip,
                "deviceName" : name
            }
        )
        
    } catch (err) {
        console.log(err);
    } finally {
        console.log(`${name} added successfully\r`)
        client.close();
    }
}