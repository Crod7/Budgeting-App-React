/**
 * PURPOSE:
 * This manages the server requests from the frontend when dealing with monthlyNetBalance documents.
 */


const express = require('express')
const MonthlyNetBalance = require('../models/monthlyNetBalanceModel')

/**
 * These are route functions available from the controller.
 */
const {
    createMonthlyNetBalance,
    updateMonthlyNetBalance,
    getMonthlyNetBalance
} = require('../controllers/monthlyNetBalanceController')

/**
 * Require the user to have an authorization token.
 */
const requireAuth = require('../middleware/requireAuth')


/**
 * Creates the router and then uses the requireAuth to require that all requests require authorization.
 * This is the middleware being called.
 */
const router = express.Router()
router.use(requireAuth)


/**
 * Depending on the request, a function will be ran from the conrtoller.
 */
router.get('/', getMonthlyNetBalance)
router.post('/', createMonthlyNetBalance)
router.patch('/:id', updateMonthlyNetBalance)

/**
 * We export to allow the program to use this.
 */
module.exports = router