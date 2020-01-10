
let config = $.getJSON("../js/config/configuration.json", (config)=>{
    
    var socket = io.connect(`http://${config.serverHost}:${config.serverPort}`, {'forceNew': true});    

    socket.emit('getMonitoringDevices')

    socket.on('devicesList', (info)=>{        
        if(info.status!='error'){renderTable(info.data)}
        else{console.log(`Error: ${info.data}`)}
    })
})

