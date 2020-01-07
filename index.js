const express = require('express')
const app = express()
const path = require('path')
/* basic configuration constants */
const config = require('./public/js/config')

app.use(express.static(path.join(__dirname, '/public')))



app.listen(config.port, ()=>{
    console.log(`Server on ${config.server}:${config.port}`)
})