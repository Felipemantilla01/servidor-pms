var monitoringWindow
var deleteClass='d-none'

function renderTable(info){
    //console.log(info)
    var header = `<table class=" text-center table ">
    <thead>
      <tr>
        <th class="${deleteClass}" scope="col">ACTION </th>  
        <th scope="col">DEVICE NAME </th>
        <th scope="col">IP MANAGEMENT</th>
        <th scope="col">TRACKING/LAST CAPTURE</th>
        <th scope="col">BATTERY VOLTAGE</th>
      </tr>
    </thead>
    <tbody>`
    var footer = `</tbody>
                </table> `;


    var html = info.map((device)=>{
        //console.log(device.deviceIp)        

        var comunicationClass = ' '
        var comunicactionText = 'Reachable'
        if(!device.comState){
            comunicationClass = 'comunicated-fail'; 
            comunicactionText = 'Unreachable'; }

        /* Test for system 12 or 24 and assign the bg color for information */
        
        
        let voltage = device.batteryVoltage
        let voltageClass = ' '

        if(voltage!=undefined){
          voltage = voltage.substring(0,4)  
          
          if(voltage>17){
          if(voltage<voltageWarning24){voltageClass='bg-warning'}
          if (voltage<voltageDanger24){voltageClass='bg-danger'}
          }
          else{
            if(voltage<voltageWarning12){voltageClass='bg-warning'}
            if (voltage<voltageDanger12){voltageClass='bg-danger'}
          }
        }
        else{
          //voltageClass='bg-info'
        }
        
        
            //converts the isodate to a date that can understand 
            let date = new Date(device.lastTime)
            let lastTimeUnderstand = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        

        
      //<a title="click to open the monitoring service for ${device.deviceName}" class="text-info" href="/pms.html">${device.deviceName}</a>

        return(`
      <tr class="${voltageClass}">
        <th class="${deleteClass} center-items"><button onclick="deleteDevice('${device.deviceIp}', '${device.deviceName}')" class=" btn-danger circle-btn-btn" ><i class="fa fa-trash-o"></i></button></th>
        <th title="click to open the monitoring service for ${device.deviceName}" style="cursor: pointer" scope="row" onClick="openMonitoringService('${device.deviceIp}')">${device.deviceName} </th>
        <td ><a  title="click to open the management service for ${device.deviceName}" class="text-dark" href="http://${device.deviceIp}">${device.deviceIp}</a></td>
        <td class="${comunicationClass} " >${comunicactionText} / ${lastTimeUnderstand}</td>
        <td>${device.batteryVoltage}</td>
      </tr>	`)
      
    }).join(' ')

    document.getElementById('devices-table').innerHTML = header +html+ footer

}

function openMonitoringService(deviceIp){
    console.log(deviceIp)
    if(monitoringWindow){monitoringWindow.close()}
    //document.location.href='/pms.html';
    monitoringWindow = window.open('/pms.html')
    socket.emit('openingMonitoringService', deviceIp)
}


$('.botonF1').hover(function(){
  $('.btn').addClass('animacionVer');
})
$('.contenedor').mouseleave(function(){
  $('.btn').removeClass('animacionVer');
})


document.getElementById('new-device').addEventListener('click', ()=>{  
  $('#newDeviceModal').modal('show')
})



document.getElementById('inputSaveDevice').addEventListener('click', ()=>{  
  $('#newDeviceModal').modal('hide')
  var deviceName = document.getElementById('inputDeviceName').value
  var  deviceIp = document.getElementById('inputDeviceIp').value
  
  var device = {
    deviceName,
    deviceIp
  }
  socket.emit('addNewDevice', device)
  window.scroll(0,0)
  document.getElementById('messages').innerHTML = `    
    <div class="alert alert-primary" role="alert">
    The device ${deviceName} with Ip : ${deviceIp} has been added
    </div>`
    setTimeout(() => {
      $(".alert").alert('close')
    }, 3000);
})


document.getElementById('delete-devices').addEventListener('click', ()=>{
  if(deleteClass=='d-none')
  {
    deleteClass=' '
  }else{
    deleteClass = 'd-none'
  }
})

function deleteDevice(deviceIp,deviceName) {
  window.scroll(0,0)
  var clientSay = prompt(`if you are sure to delete enter the device name >> ${deviceName} <<  Note: delete the device deletes all information about him`);
  if(clientSay == deviceName)
  {
    socket.emit('deleteDevice', deviceIp)
    
    document.getElementById('messages').innerHTML = `    
    <div class="alert alert-primary" role="alert">
    The device ${deviceName} with Ip : ${deviceIp} has been deleted
    </div>`
    setTimeout(() => {
      $(".alert").alert('close')
    }, 3000);
  }
  else{
    alert(`Error: the device wasn't deleted`)
  }


  
}