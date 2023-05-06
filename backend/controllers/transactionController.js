/**
 * PURPOSE:
 * This controls the transaction document requests.
 */
const Transaction = require('../models/transactionModel')
const mongoose = require('mongoose')



/**
 * Gets all Transactions.
 */
const getAllTransactions = async (req, res) => {
    // The user_id will require that only the data linked to the user_id will be fetched
    const user_id = req.user._id
    // inside .find we search for a certain value(.find({withdraw: 20})), but leaving it blank returns all.
    const transactions = await Transaction.find({ user_id }).sort({createdAt: -1}) //-1 will return the newest dates on top
                                                                // and have the oldest dates at the bottom

    res.status(200).json(transactions)                               // Will return the Transactions found
}

/**
 * Gets a single Transaction.
 */
const getTransaction = async (req, res) => {
    // This id is changable depending on the id of the Transaction being grabbed
    const {id} = req.params                 //This will grab the id from transaction.js the one that has this -> ('/:id',

    if (!mongoose.Types.ObjectId.isValid(id)) {                     // If the Transaction your looking for isn't
        return res.status(404).json({error: 'No such Transaction'})      // in the DB, throw this error message
    }
    const transaction = await Transaction.findById(id)

    // Checks to see if Transaction was found with matching ID, will end function if not found
    if (!transaction){
        return res.status(404).json({error: 'no such Transaction'})
    }

    // The Transaction was found, export the Transaction out
    res.status(200).json(transaction)
}

/**
 * Creates a new Transaction.
 */
const createTransaction = async(req, res) => {
    const {title, withdraw, dateId} = req.body                         //What this request will have as parameters
    /**
     * Error handling messages for the form on the frontend.
     */
    let emptyFields = []
    if(!title){
        emptyFields.push('title')
    }
    if(!withdraw){
        emptyFields.push('withdraw')
    }
    if(emptyFields.length > 0){
        return res.status(400).json ({error: 'Please fill in all the fields', emptyFields})
    }
    /**
     * Add data to database, this is where we add directly to the database.
     */
    try{
        const user_id = req.user._id                                        
        const transaction = await Transaction.create({title, withdraw, user_id, dateId})
        res.status(200).json(transaction)
    } catch (error){
        res.status(400).json({error: error.message})
    }
}


/**
 * Deletes a Transaction.
 */
const deleteTransaction = async (req, res) => {
    const {id} = req.params                 //This will grab the id from transaction.js the one that has this -> ('/:id',
    if (!mongoose.Types.ObjectId.isValid(id)) {                     // If the transaction your looking for isn't
        return res.status(404).json({error: 'No such Transaction'})      // in the DB, throw this error message
    }
    /**
     * This deletes any matching budget, _id is used to access the id of the objects inside mongoose
     * id and _id are not the same, but we store the value of _id into id to use here in our code.
     */
    const transaction = await Transaction.findOneAndDelete({_id: id})
    /**
     * If no transaction exist to delete, return this message.
     */
    if (!transaction) {
        return res.status(400).json({error: 'No transaction was found to delete'})
    }
    /**
     * If the budget is succesfully deleted.
     */
    return res.status(200).json(transaction)
}

/**
 * Updates a Transaction
 */
const updateTransaction = async (req, res) => {
    const {id} = req.params                 // This will grab the id from transaction.js the one that has this -> ('/:id',
    if (!mongoose.Types.ObjectId.isValid(id)) {                     // If the Transaction your looking for isn't
        return res.status(404).json({error: 'No such Transaction'})      // in the DB, throw this error message
    }
    /**
     * What every properties are on the body, we will output it here
     * This is to update more effectivle, let the user define what needs to be updated
     * Helps avoid boiler plate code
     */
    const transaction = await Transaction.findOneAndUpdate({_id: id}, {
        ...req.body       
    })
    /**
     * If no budget exist to update, return this message.
     */  
    if (!transaction) {
        return res.status(400).json({error: 'No Transaction was found to update'})
    }
    /**
     * If the budget is succesfully updated
     */
    res.status(200).json(transaction)
}
/**
 * You have to export it manually then call it in the other files that want to use this.
 */
module.exports = {
    createTransaction,
    getTransaction,
    getAllTransactions,
    deleteTransaction,
    updateTransaction
}