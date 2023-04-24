const express = require('express')
const Budget = require('../models/budgetModel')

const {                                         // We are importing many things so for organization we
    createBudget,                               // format it like this. 
    getBudget,
    getAllBudgets,
    deleteBudget,
    updateBudget

} = require('../controllers/budgetController')  // This is where we are importing these functions from

const requireAuth = require('../middleware/requireAuth')    // We import the middleware that checks auth before
                                                            // allowing user to use route


// This creates an instance of the Router
const router = express.Router()

router.use(requireAuth)                         // fires middleware function before router
                                                // authorization needed for all routes


// A function will run once a get request comes in defined here
router.get('/', getAllBudgets)                  // GET all transactions
router.get('/:id', getBudget)                   // GET a single transaction
router.post('/', createBudget)                  // POST a new transaction
router.delete('/:id', deleteBudget)             // DELETE a new transaction
router.patch('/:id', updateBudget)              // UPDATE a new transaction

// Export to rest of program
module.exports = router