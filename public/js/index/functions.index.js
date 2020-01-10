function renderTable(info){
    //console.log(info)
    var header = `<table class=" text-center ml-5 mr-5 table table-hover">
    <thead>
      <tr>
        <th scope="col">DEVICE NAME</th>
        <th scope="col">IP</th>
        <th scope="col">TRACKING</th>
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
            comunicationClass = 'text-danger'; 
            comunicactionText = 'Unreachable'; }
        
//<a title="click to open the monitoring service for ${device.deviceName}" class="text-info" href="/pms.html">${device.deviceName}</a>

        return(`
      <tr>
        <th scope="row">${device.deviceName}</th>
        <td ><a  title="click to open the management service for ${device.deviceName}" class="text-dark" href="http://${device.deviceIp}">${device.deviceIp}</a></td>
        <td class="${comunicationClass}" >${comunicactionText}</td>
        <td>${device.batteryVoltage}</td>
      </tr>	`)
      
    }).join(' ')

    document.getElementById('devices-table').innerHTML = header +html+ footer


}