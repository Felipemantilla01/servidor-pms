
let config = $.getJSON("../js/config/configuration.json", (config)=>{
    
    var socket = io.connect(`http://${config.serverHost}:${config.serverPort}`, {'forceNew': true});    

    socket.emit('getMonitoringData', '10.41.14.6') //empezamos monitoreo de equipo especifico enviando la ip

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

})


//
