let sampleTime = 500 // on ms
let sampleTimeHistorics = 60000*5//1800000 media hora 

const express = require('express')
const app = express()
const path = require('path')
/* basic configuration constants */
const config = require('./public/js/config/configuration')
var server = require('http').Server(app);
var io = require('socket.io')(server)
/* clients for management the info to the frontend*/
let clientDB = require('./src/db/db.functions') // para acceder directamente a la base de datos 
let clientHistorics = require('./src/db/historics.functions') // para acceder directamente a la base de datos de historicos 
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
        }, 1000);
    })

    socket.on('openHistoricsService', async ()=>{
        console.log(`Opening Historic Service `)
        let response = await clientDB.findDevices()
        socket.emit('devicesList', response)
        //console.log(response)
    })

    socket.on('getHistoricsFor', async (deviceIp)=>{
        console.log(`Client wants historics of ${deviceIp}`)
        let response = await clientHistorics.findDeviceHistorics(deviceIp)
        //console.log(response)
        socket.emit('historics', response)
    })

    socket.on('addNewDevice', async(device)=>{
        console.log(device)
    })




})


server.listen(config.serverPort, ()=>{
    console.log(`Server on ${config.serverHost}:${config.serverPort}`)
    clientSRC.monitoring(sampleTime)
    console.log(`Monitoring service starting with a ${sampleTime}ms of sample time `)
    clientSRC.historics(sampleTimeHistorics)
    console.log(`Historics service starting with a ${sampleTimeHistorics/1000}s of sample time `)
})