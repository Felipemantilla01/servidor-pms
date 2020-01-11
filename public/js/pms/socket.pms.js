    
    var socket = io.connect(`http://${serverHost}:${serverPort}`, {'forceNew': true});    


    socket.on('openMonitoringService', (deviceIp)=>{
        console.log(deviceIp)
        socket.emit('getMonitoringData', deviceIp) //empezamos monitoreo de equipo especifico enviando la ip
    })
    

    socket.on('monitoringData', (info)=>{
        //console.log(info)
        if(info.status!='error')
        {
            renderInformation(info.data[0])
        }
        else{
            console.log(info.data)            
        }
    })



