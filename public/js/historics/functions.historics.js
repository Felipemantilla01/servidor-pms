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
    document.getElementById('deviceIp').value = deviceIp

    var date = new Date()
    var day = date.getDate()
    var month = date.getMonth()
    var year = date.getFullYear()


    var initialDate = new Date(`${year} ${month+1} ${day}`).toISOString()
    console.log(initialDate)
    var rangeDate = {
      initialDate:initialDate,
      finalDate: "2100-01-01"
    }

    socket.emit('getHistoricsFor', deviceIp, rangeDate)
    $('#devicesModal').modal('hide')
}


function renderCharts(historics)
{
    //console.log(historics)

    
    var time  = []
    var panelVoltage = []
    var batteryVoltage = []
    var loadVoltage = []
    var panelCurrent =[]
    var batteryCurrent = []
    var loadCurrent = []
    var temperature = []
    var comState = []

    var i = 0;
    historics.forEach(historic => {
      
      let date = new Date(historic.lastTime)
      let lastTimeUnderstand = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  
        time[i] = lastTimeUnderstand
        panelVoltage[i] = historic.panelVoltage.substring(0,4)
        batteryVoltage[i] = historic.batteryVoltage.substring(0,4)
        loadVoltage[i] = historic.loadVoltage.substring(0,4)
        panelCurrent[i] = historic.panelCurrent.substring(0,4)
        batteryCurrent[i] = historic.batteryCurrent.substring(0,4)
        loadCurrent[i] = historic.loadCurrent.substring(0,4)
        temperature[i] = historic.temperature.substring(0,3)                
        if(historic.comState==true){comState[i]=1}
        else{comState[i]=0}
        //comState[i] = historic.comState     
        i++
        
   });

   console.log(temperature)
    
   
   
    var ctxVoltage = document.getElementById('voltage-chart').getContext('2d');
    var ctxCurrent = document.getElementById('current-chart').getContext('2d');
    var ctxTemperature = document.getElementById('temperature-chart').getContext('2d');
    //document.getElementById('device-name').innerHTML = `${historics[0].deviceName}`
    
    var panelVoltageData = {
    label: "Panel voltage (V)",
    data: panelVoltage,
    borderColor: '#FF628C',
    lineTension: 0,
    yAxisID: 'y-axis-voltage',
    // Set More Options
  };
     
  var batteryVoltageData = {
    label: "Battery Voltage (V)",
    data: batteryVoltage,
    borderColor: '#0086D1',
    lineTension: 0,
    yAxisID: 'y-axis-voltage',
    // Set More Options
  };

  var loadVoltageData = {
    label: "Load Voltage (V)",
    data: loadVoltage,
    borderColor: '#FFE333',
    lineTension: 0,
    yAxisID: 'y-axis-voltage',
    // Set More Options
  };


  var panelCurrentData = {
    label: "Panel Current (V)",
    data: panelCurrent,
    borderColor: '#FF628C',
    lineTension: 0,
    yAxisID: 'y-axis-current',
    // Set More Options
  };
     
  var batteryCurrentData = {
    label: "Battery Current (V)",
    data: batteryCurrent,
    borderColor: '#0086D1',
    lineTension: 0,
    yAxisID: 'y-axis-current',
    // Set More Options
  };

  var loadCurrentData = {
    label: "Load Current (V)",
    data: loadCurrent,
    borderColor: '#FFE333',
    lineTension: 0,
    yAxisID: 'y-axis-current',
    // Set More Options
  };

  var temperatureData = {
    label: "Temperature (°C)",
    data: temperature,
    borderColor: '#FFE333',
    lineTension: 0,
    yAxisID: 'y-axis-temperature',
    // Set More Options
  };


  var comStateData = {
    label: "communication state (ping)",
    data: comState,
    borderColor: '#329236',
    lineTension: 0,
    yAxisID: 'y-axis-comstate',
    // Set More Options
  };

     
  var historicsDataVoltage = {
    labels: time,
    datasets: [panelVoltageData, batteryVoltageData,loadVoltageData,comStateData]
  };
   
  var historicsDataCurrent = {
    labels: time,
    datasets: [panelCurrentData, batteryCurrentData,loadCurrentData,comStateData]
  };

  var historicsDataTemperature = {
    labels: time,
    datasets: [temperatureData,comStateData]
  };
   
  var voltageChart = new Chart(ctxVoltage, {
    type: 'line',
    data: historicsDataVoltage,
    options: {
      animation: {
        duration: 0 // general animation time
      },
      responsive: true,
      hoverMode: 'index',
      stacked: false,
      title: {
        display: true,
        text: 'Voltage Historics'
      },
      scales: {
        yAxes: [{
          type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
          display: true,
          position: 'left',
          id: 'y-axis-voltage',
        }, {
          type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
          display: true,
          position: 'right',
          id: 'y-axis-comstate',

          // grid line settings
          gridLines: {
            drawOnChartArea: false, // only want the grid lines for one axis to show up
          },
        }],
      }
    }


  });

  var currentChart =  new Chart(ctxCurrent, {
    type: 'line',
    data: historicsDataCurrent,
     options: {
      animation: {
        duration: 0 // general animation time
      },
      responsive: true,
      hoverMode: 'index',
      stacked: false,
      title: {
        display: true,
        text: 'Current Historics'
      },
      scales: {
        yAxes: [{
          type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
          display: true,
          position: 'left',
          id: 'y-axis-current',
        }, {
          type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
          display: true,
          position: 'right',
          id: 'y-axis-comstate',

          // grid line settings
          gridLines: {
            drawOnChartArea: false, // only want the grid lines for one axis to show up
          },
        }],
      }
    }
  })

  var temperatureChart =  new Chart(ctxTemperature, {
    type: 'line',
    data: historicsDataTemperature,
    options: {
      animation: {
        duration: 0 // general animation time
      },
      responsive: true,
      hoverMode: 'index',
      stacked: false,
      title: {
        display: true,
        text: 'Temperature Historics'
      },
      scales: {
        yAxes: [{
          type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
          display: true,
          position: 'left',
          id: 'y-axis-temperature',
        }, {
          type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
          display: true,
          position: 'right',
          id: 'y-axis-comstate',

          // grid line settings
          gridLines: {
            drawOnChartArea: false, // only want the grid lines for one axis to show up
          },
        }],
      }
    }
  })

  

    
}




//date time picker




/*

$(function () {
  $('#datetimepicker1').datetimepicker();
      $('#datetimepicker2').datetimepicker({
          useCurrent: false 
      });
      $("#datetimepicker1").on("dp.change", function (e) {
          $('#datetimepicker2').data("DateTimePicker").minDate(e.date);
      });
      $("#datetimepicker2").on("dp.change", function (e) {
          $('#datetimepicker1').data("DateTimePicker").maxDate(e.date);
      });
});



document.getElementById('btnSearch').addEventListener('click', ()=>{
 var initialDate = document.getElementById('initialDate').value
 var finalDate = document.getElementById('finalDate').value

 var initialDateISO = new Date(initialDate)
 var finalDateISO = new Date(finalDate)

 initialDateISO = initialDateISO.toISOString()
 finalDateISO = finalDateISO.toISOString()

 var dateRange = {
     initialDate : initialDateISO,
     finalDate : finalDateISO
 }

 console.log(dateRange)
 // emitir socket con los valores de la consulta
})*/