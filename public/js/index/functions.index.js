var monitoringWindow

function renderTable(info){
    //console.log(info)
    var header = `<table class=" text-center table ">
    <thead>
      <tr>
        <th scope="col">DEVICE NAME</th>
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
        
        
            
        

        
      //<a title="click to open the monitoring service for ${device.deviceName}" class="text-info" href="/pms.html">${device.deviceName}</a>

        return(`
      <tr class="${voltageClass}">
        <th title="click to open the monitoring service for ${device.deviceName}" style="cursor: pointer" scope="row" onClick="openMonitoringService('${device.deviceIp}')">${device.deviceName}</th>
        <td ><a  title="click to open the management service for ${device.deviceName}" class="text-dark" href="http://${device.deviceIp}">${device.deviceIp}</a></td>
        <td class="${comunicationClass} " >${comunicactionText} / ${device.lastTime}</td>
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