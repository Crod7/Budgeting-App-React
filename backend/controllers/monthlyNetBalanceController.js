/**
 * PURPOSE:
 * Controls what happens when certain requests are called to the server.
 */


/**
 * Gets the MonthlyNetBalance schema to be used depending on request recieved.
 */
const MonthlyNetBalance = require('../models/monthlyNetBalanceModel')
/**
 * We use mongoose to connect to the database.
 */
const mongoose = require('mongoose')

/**
 * This gets all monthlyNetBalance documents that have a match id with the user that created them.
 * @param {*} req This will hold the user._id needed to find matching documents.
 * @param {*} res This returns an array of all documents found matching.
 */
const getAllMonthlyNetBalance = async (req, res) => {
    /**
     * This holds the user id will we use to compare to the documents. It is obtained from the request.
     */
    const user_id = req.user._id
    
    /**
     * We find all monthlyNetBalance documents and store them in a variable
     */
    const monthlyNetBalance = await MonthlyNetBalance.find({ user_id }).sort({createdAt: -1})

    /**
     * We return the response object holding the monthlyNetBalance.
     */
    res.status(200).json(monthlyNetBalance)
}

/**
 * We create a new monthlyNetBudget document.
 * @param {*} req The request will hold the variables needed in creating the document.
 * @param {*} res Responds if the request was successful or not.
 */
const createMonthlyNetBalance = async(req, res) => {
    const {balance, dateId} = req.body
    try{
        const user_id = req.user._id                         
        const monthlyNetBalance = await MonthlyNetBalance.create({balance, dateId, user_id})
        console.log(monthlyNetBalance)
        res.status(200).json(monthlyNetBalance)
    } catch (error){
        res.status(400).json({error: error.message})
    }
}

/**
 * Uses a GET request to get the monthlyNetBalance document by seraching for matching dateId.
 */
const getMonthlyNetBalance = async (req, res) => {
    const user_id = req.user._id
    const monthlyNetBalance = await MonthlyNetBalance.find({ user_id }).sort({createdAt: -1})
    res.status(200).json(monthlyNetBalance)
}



/**
 * This finds a monthlyNetBalance and updates it.
 * @param {*} req Will carry the new values and keys that will be used to update the document.
 * @param {*} res Checks to see if connection was successful.
 * @returns An error messgae displayed to the user.
 */
const updateMonthlyNetBalance = async (req, res) => {
    /**
     * Grabs the id parameter from the request and verifies that their is a document in the database
     * matching it.
     */
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such monthlyNetBalance documents.'})
    }

    /**
     * Finds the document matching the id and sets it to const monthlyNetBalance. This allows us
     * to work with it.
     */
    const monthlyNetBalance = await MonthlyNetBalance.findOneAndUpdate({_id: id}, {
        ...req.body       
    })

    /**
     * No monthlyNetBalance exists, throw an error message.
     */
    if (!monthlyNetBalance) {
        return res.status(400).json({error: 'No monthlyNetBalance was found to update'})
    }
    
    /**
     * Tells the user that the update was successful.
     */
    res.status(200).json(monthlyNetBalance)
}

/**
 * Functions for server requests exported.
 */
module.exports = {
    createMonthlyNetBalance,
    updateMonthlyNetBalance,
    getMonthlyNetBalance
}