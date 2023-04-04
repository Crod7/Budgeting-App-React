const express = require('express')

// This creates an instance of the Router
const router = express.Router()

// A function will run once a get request comes in defined here
// GET all workouts
router.get('/', (req, res) => {
    res.json({mssg: 'GET all workouts'})
})
// GET a single workout
router.get('/:id', (req, res) => {              // addding a : in the path means that :id can change
    res.json({mssg: 'GET a single workout'})    // depending on what the user is looking for
})
// POST a new workout
router.post('/', (req, res) => {
    res.json({mssg: "POST a new workout"})
})
// DELETE a new workout
router.delete('/:id', (req, res) => {
    res.json({mssg: "DELETE a new workout"})
})
// UPDATE a new workout
router.patch('/:id', (req, res) => {
    res.json({mssg: "UPDATE a new workout"})
})

// Export to rest of program
module.exports = router