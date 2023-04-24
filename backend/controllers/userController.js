
const User = require('../models/userModel')
const mongoose = require('mongoose')

const jwt = require('jsonwebtoken')


// geta a single user
const getUserData = async (req, res) => {
    const user_email = req.email

    const users = await User.find({ user_email }).sort({createdAt: -1})

    res.status(200).json(users)

    //=============================
    
    // This id is changable depending on the id of the budget being grabbed
    /*const {email} = req.params                 //This will grab the id from budget.js the one that has this -> ('/:id',



    /*if (!mongoose.Types.ObjectId.isValid(email)) {                     // If the budget your looking for isn't
        return res.status(404).json({error: 'No such user yeeeet'})      // in the DB, throw this error message
    }*/
    /*console.log(email)
    console.log("-----")
    const userData = await User.find({
        "email": email
    }) 
    console.log(userData)
    // Checks to see if budget was found with matching ID, will end function if not found
    if (!userData){
        // We add a return to end this function
        return res.status(404).json({error: 'no such user 2 yeeet'})
    }

    // The budget was found, export the budget out
    res.status(200).json(userData)
    */
}




const createToken = (_id) => {                                     // We take the id of a user 
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '7d'})  // Token takes ID, a hidden string, and days for it to expire
}


// login user
const loginUser = async (req, res) => {
    
    const {email, password} = req.body

    try {
        const user = await User.login(email, password)
        //console.log(user.firstName)

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

module.exports = { signupUser, 
    loginUser, 
    getUserData}

