function renderInformation(info){

    //console.log(info)

    
    document.getElementById('deviceName').innerHTML = info.deviceName
    document.getElementById('panelVoltage').innerHTML = info.panelVoltage
    document.getElementById('panelCurrent').innerHTML = info.panelCurrent
    document.getElementById('loadVoltage').innerHTML = info.loadVoltage
    document.getElementById('loadCurrent').innerHTML = info.loadCurrent
    document.getElementById('batteryVoltage').innerHTML = info.batteryVoltage
    document.getElementById('batteryCurrent').innerHTML = info.batteryCurrent

    document.getElementById('comState').innerHTML = info.comState
    document.getElementById('sysUpTime').innerHTML = info.sysUpTime
    document.getElementById('deviceIp').innerHTML = info.deviceIp
    document.getElementById('temperature').innerHTML = info.temperature

    
}