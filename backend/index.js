/*
// stoped around 6 minutes
require('dotenv').config()

const express = require('express')

//express app
const app = express()

//middleware
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.get('/', (req, res) =>{
    res.json({mssg: 'Welcome to app'})
})

// listen for request
app.listen(process.env.PORT, () =>{
    console.log('listening on port 5500')
})
*/
//====================================================

// The program is creating variables to use
const http = require('http');
const fs = require('fs');

// When a user opens server page
const server = http.createServer((req, res)=>{
    res.setHeader('Content-Type', 'text/html');
    fs.readFile('../frontend/index.html', (err, data) =>{
        if (err){
            console.log(err);
            res.end();
        } else{
            res.write(data);
            res.end;
        }
    })
});

// Starts to listen for requests
server.listen(5500, 'localhost', ()=>{
    console.log('listening for requests on port 5500');
});