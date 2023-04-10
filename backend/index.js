
require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
//express app
const app = express()
const budgetRoutes = require('./routes/budgets.js')// This is how you link your route
                                                   // Don't need to add extension(figured out automaticaly)
const userRoutes = require('./routes/user.js')


//middleware
app.use(express.json()) // Any request, will look to see if that 
                        // request(from routes) has a body to it(req.body )

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/budgets', budgetRoutes) // (path, route object)
app.use('/api/user', userRoutes) // (path, route object)

// Connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {                       // .then makes the program finish the code first
                                        // then runs the code inside it's block.
        // listen for request
        app.listen(process.env.PORT, () =>{
            console.log('listening on port 5500')   // This is ran after connection compelte to MongoDB
        })

    })
    .catch((error) => {
        console.log(error)
    })











/*
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
*/