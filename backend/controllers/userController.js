
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')


const createToken = (_id) => {                                     // We take the id of a user 
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '7d'})  // Token takes ID, a hidden string, and days for it to expire
}


// login user
const loginUser = async (req, res) => {
    
    const {email, password} = req.body

    try {
        const user = await User.login(email, password)

        const token = createToken(user._id)                                 // This creates a token for this user id

        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})

    }
}




// signup user
const signupUser = async (req, res) => {
    const {firstName, lastName, email, password} = req.body

    try {
        const user = await User.signup(firstName, lastName, email, password)

        const token = createToken(user._id)                                 // This creates a token for this user id

        res.status(200).json({firstName, lastName, email, token})
    } catch (error) {
        res.status(400).json({error: error.message})

    }
}


module.exports = { signupUser, loginUser }