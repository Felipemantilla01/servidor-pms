function renderList(devices){
    var header = `<table class=" text-center table table-hover">
    <thead>
      <tr>
        <th scope="col">DEVICE NAME</th>
        <th scope="col">IP MANAGEMENT</th>
      </tr>
    </thead>
    <tbody>`
    var footer = `</tbody>
                </table> `;

    var html = devices.map((device)=>{
        return(`
      <tr>
        <th title="click to open the monitoring service for ${device.deviceName}" style="cursor: pointer" scope="row" onClick="openHistoricService('${device.deviceIp}')">${device.deviceName}</th>
        <td ><a  title="click to open the management service for ${device.deviceName}" class="text-dark" href="http://${device.deviceIp}">${device.deviceIp}</a></td>       
      </tr>	`)
    }).join(' ')
    
    document.getElementById('list-of-devices').innerHTML = header + html + footer

    $('#devicesModal').modal('show')
}

function openHistoricService(deviceIp){
    console.log(deviceIp)
    socket.emit('getHistoricsFor', deviceIp)
    $('#devicesModal').modal('hide')
}


function renderCharts(historics)
{
    //console.log(historics)

    var time  = []
    var panelVoltage = []
    var batteryVoltage = []
    var i = 0;
    historics.forEach(historic => {
       
        time[i] = historic.lastTime
        panelVoltage[i] = historic.panelVoltage.substring(0,4)
        batteryVoltage[i] = historic.batteryVoltage.substring(0,4)
        i++
        
   });

   //console.log(panelVoltage)
    
   

    var ctx = document.getElementById('myChart').getContext('2d');
    var dataFirst = {
    label: "Panel voltage (V)",
    data: panelVoltage,
    borderColor: '#FF628C',
    lineTension: 0,
    // Set More Options
  };
     
  var dataSecond = {
    label: "Battery Voltage (V)",
    data: batteryVoltage,
    borderColor: '#0086D1',
    lineTension: 0,
    // Set More Options
  };
     
  var speedData = {
    labels: time,
    datasets: [dataFirst, dataSecond]
  };
   
   
  var lineChart = new Chart(ctx, {
    type: 'line',
    data: speedData
  });

    
}
