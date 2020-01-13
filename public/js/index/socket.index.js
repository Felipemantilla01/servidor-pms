


var socket = io.connect(`http://${serverHost}:${serverPort}`, {'forceNew': true});    

socket.emit('getMonitoringDevices')

socket.on('devicesList', (info)=>{        
    if(info.status!='error'){renderTable(info.data)}
    else{console.log(`Error: ${info.data}`)}
})

socket.on('responseAddNewDevice', (info)=>{
    //console.log(info)
    document.getElementById('inputDeviceName').value= ''
    document.getElementById('inputDeviceIp').value=''
    document.getElementById('messages').innerHTML = `    
    <div class="alert alert-success" role="alert">
    The device was added successfully
    </div>`
    setTimeout(() => {
      $(".alert").alert('close')
    }, 3000);

})

socket.on('responseDeleteDevice', (info)=>{
    //console.log(info)
    document.getElementById('messages').innerHTML = `    
    <div class="alert alert-success" role="alert">
    The device was deleted successfully
    </div>`
    setTimeout(() => {
      $(".alert").alert('close')
    }, 3000);
})