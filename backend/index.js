/**
 * PURPOSE:
 * Manages the backend. Such as what address to call in order to make a request to the backend.
 */

/**
 * Calls the env file.
 */
require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

/**
 * Starts the express app.
 */
const app = express()

/**
 * The routes that can be called in the program.
 */
const transactionRoutes = require('./routes/transactions.js')
const userRoutes = require('./routes/user.js')
const monthlyNetBalanceRoutes = require ('./routes/monthlyNetBalance.js')


//middleware
/**
 * This is the middleware. Any request will look to see if that request(from routes) has a body to it(req.body).
 */
app.use(express.json())
/**
 * Prints out all requests made to the backend.
 */
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})
/**
 * List of routes.
 */
app.use('/api/budgets', transactionRoutes) // (path, route object)
app.use('/api/user', userRoutes) // (path, route object)
app.use('/api/monthlyNetBalance', monthlyNetBalanceRoutes)
/**
 * This connects to the database.
 */
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