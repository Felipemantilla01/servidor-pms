const express = require('express')
const app = express()
/* basic configuration constants */
const config = require('../public/js/config')


app.get('/',(req,res)=>{
    res.send('Hello World!')
})

app.listen(config.port, ()=>{
    console.log(`Server on ${config.server}:${config.port}`)
})