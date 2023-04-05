//TIME 4:27
const express = require('express')
const Budget = require('../models/budgetModel')

const {                                         // We are importing many things so for organization we
    createBudget,                               // format it like this. 
    getBudget,
    getAllBudgets,
    deleteBudget,
    updateBudget

} = require('../controllers/budgetController')  // This is where we are importing these functions from


// This creates an instance of the Router
const router = express.Router()


// A function will run once a get request comes in defined here
// GET all workouts
router.get('/', getAllBudgets)
// GET a single workout
router.get('/:id', getBudget)
// POST a new workout
router.post('/', createBudget)

// DELETE a new workout
router.delete('/:id', deleteBudget)
// UPDATE a new workout
router.patch('/:id', updateBudget)

// Export to rest of program
module.exports = router