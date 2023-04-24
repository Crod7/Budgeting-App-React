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
