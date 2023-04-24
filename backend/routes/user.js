const express = require('express')
const User = require('../models/userModel')


// Controller functions
const { signupUser, 
    loginUser,
    getUserData
    } = require('../controllers/userController')

const router = express.Router()


// login route
router.post('/login', loginUser)



// signup route
router.post('/signup', signupUser)

//==============NEW CODE==================

// A function will run once a get request comes in defined here
router.get('/:email', getUserData)                   // GET a single transaction

//=========================================
module.exports = router