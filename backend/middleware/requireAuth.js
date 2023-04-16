// Requires the user to have a valid token to use the program, trying to use fake tokens or modified tokens
// will result in an error, This protects against unauthenticated users

const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {

    // verify authentication
    const { authorization } = req.headers

    // error message if no authentication is found
    if(!authorization){
        return res.status(401).json({error: 'Authorization token requried'})
    }
    // grabs the token from header
    const token = authorization.split(' ')[1]

    // verify if the token is valid
    try {
        const {_id} = jwt.verify(token, process.env.SECRET)
        req.user = await User.fineOne({_id}).select('_id')
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({error: 'Request is not authorized'})
    }
}

module.exports = requireAuth