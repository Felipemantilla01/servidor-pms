const express = require('express')
const app = express()
const path = require('path')
/* basic configuration constants */
const config = require('./public/js/config/configuration')
var server = require('http').Server(app);
var io = require('socket.io')(server)
/* clients for management the info to the frontend*/
let clientDB = require('./src/db/db.functions')

app.use(express.static(path.join(__dirname, '/public')))

io.on('connection', function(socket){
    //console.log('someone is connected with sockets')

    socket.on('getMonitoringData', async (deviceIp)=>{

        console.log(`Client wants info from the device ${deviceIp}`)
        setInterval(async () => {
            let info = await clientDB.findDeviceInfo(deviceIp)
            socket.emit('monitoringData', info)
        }, 250);        
    })

    socket.on('getMonitoringDevices', async ()=>{
        console.log(`Client wants info from all devices`)

        let info = await clientDB.findDevices()
        socket.emit('devicesList', info)
    })




})


server.listen(config.serverPort, ()=>{
    console.log(`Server on ${config.serverHost}:${config.serverPort}`)
})