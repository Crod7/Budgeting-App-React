/**
 * PURPOSE:
 * Manages the routes for transactions.
 */
const express = require('express')
const Transaction = require('../models/transactionModel')
/**
 * We are importing the functions from the controller.
 */
const {
    createTransaction,
    getTransaction,
    getAllTransactions,
    deleteTransaction,
    updateTransaction
} = require('../controllers/transactionController')
/**
 * We import the middleware that checks auth before allowing user to use route.
 */
const requireAuth = require('../middleware/requireAuth')
/**
 * This creates an instance of the Router
 */
const router = express.Router()
/**
 * Fires middleware function before router authorization needed for all routes.
 */
router.use(requireAuth)
/**
 * A function will run once a get request comes in defined here.
 */
router.get('/', getAllTransactions)                  // GET all transactions
router.get('/:id', getTransaction)                   // GET a single transaction
router.post('/', createTransaction)                  // POST a new transaction
router.delete('/:id', deleteTransaction)             // DELETE a new transaction
router.patch('/:id', updateTransaction)              // UPDATE a new transaction
/**
 * Export to rest of program.
 */
module.exports = router