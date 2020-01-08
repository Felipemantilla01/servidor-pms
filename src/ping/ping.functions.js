let _ping = require('ping')

const ping = (host) =>{
    return new Promise(resolve =>{
        _ping.sys.probe(host, (isAlive) =>{
            resolve({isAlive:isAlive})
        })
    })
}

exports.ping = ping 