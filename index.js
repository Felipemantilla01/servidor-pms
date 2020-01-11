let sampleTime = 500 // on ms

const express = require('express')
const app = express()
const path = require('path')
/* basic configuration constants */
const config = require('./public/js/config/configuration')
var server = require('http').Server(app);
var io = require('socket.io')(server)
/* clients for management the info to the frontend*/
let clientDB = require('./src/db/db.functions')
let clientSRC = require('./src/index')

app.use(express.static(path.join(__dirname, '/public')))

io.on('connection', function(socket){
    //console.log('someone is connected with sockets')

    socket.on('getMonitoringData', async (deviceIp)=>{

        console.log(`Client wants info from the device ${deviceIp}`)
        setInterval(async () => {
            let info = await clientDB.findDeviceInfo(deviceIp)
            socket.emit('monitoringData', info)
        }, sampleTime);        
    })

    socket.on('getMonitoringDevices', async ()=>{
        console.log(`Client wants info from all devices`)

       setInterval(async () => {
            let info = await clientDB.findDevices()
            socket.emit('devicesList', info)
       }, sampleTime);
    })

    socket.on('openingMonitoringService', (deviceIp)=>{
        console.log(`Opening Monitoring Service for ${deviceIp}`)
        setTimeout(() => {
            socket.broadcast.emit('openMonitoringService', deviceIp)
        }, sampleTime);
    })




})


server.listen(config.serverPort, ()=>{
    console.log(`Server on ${config.serverHost}:${config.serverPort}`)
    clientSRC.monitoring(sampleTime)
    console.log(`Monitoring service starting with a ${sampleTime}ms of sample time `)
})