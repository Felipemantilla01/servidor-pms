


var socket = io.connect(`http://${serverHost}:${serverPort}`, {'forceNew': true});    

socket.emit('getMonitoringDevices')

socket.on('devicesList', (info)=>{        
    if(info.status!='error'){renderTable(info.data)}
    else{console.log(`Error: ${info.data}`)}
})