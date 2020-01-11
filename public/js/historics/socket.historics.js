
var socket = io.connect(`http://${serverHost}:${serverPort}`, {'forceNew': true});    

socket.emit('openHistoricsService')

socket.on('devicesList', (data)=>{
    if(data.status!='error'){
        renderList(data.data)
    }
    else{
        console.log(`Error: ${data.data}`)
    }
})


socket.on('historics', (data)=>{
    if(data.status!='error'){
        renderCharts(data.data)
    }
    else{
        console.log(`Error: ${data.data}`)
    }
})