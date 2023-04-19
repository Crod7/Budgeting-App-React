// Store functions here to keep code clean

const Budget = require('../models/budgetModel')
const mongoose = require('mongoose')



// get all budgets
const getAllBudgets = async (req, res) => {
    // The user_id will require that only the data linked to the user_id will be fetched
    const user_id = req.user._id

    // inside .find we search for a certain value(.find({withdraw: 20})), but leaving it blank returns all.
    const budgets = await Budget.find({ user_id }).sort({createdAt: -1}) //-1 will return the newest dates on top
                                                                // and have the oldest dates at the bottom

    res.status(200).json(budgets)                               // Will return the budgets found
}


// geta a single budget
const getBudget = async (req, res) => {
    // This id is changable depending on the id of the budget being grabbed
    const {id} = req.params                 //This will grab the id from budget.js the one that has this -> ('/:id',

    if (!mongoose.Types.ObjectId.isValid(id)) {                     // If the budget your looking for isn't
        return res.status(404).json({error: 'No such budget'})      // in the DB, throw this error message
    }

    const budget = await Budget.findById(id)

    // Checks to see if budget was found with matching ID, will end function if not found
    if (!budget){
        // We add a return to end this function
        return res.status(404).json({error: 'no such budget'})
    }

    // The budget was found, export the budget out
    res.status(200).json(budget)
}


// create a new budget
const createBudget = async(req, res) => {
    const {title, withdraw, deposit} = req.body                         //What this request will have as parameters

    // error handling messages on the form
    let emptyFields = []

    if(!title){
        emptyFields.push('title')
    }
    if(!withdraw){
        emptyFields.push('withdraw')
    }
    if(!deposit){
        emptyFields.push('deposit')
    }
    if(emptyFields.length > 0){
        return res.status(400).json ({error: 'Please fill in all the fields', emptyFields})
    }





    // add data to database, this is where we add directly to the database
    try{
        const user_id = req.user._id                                        
        const budget = await Budget.create({title, withdraw, deposit, user_id})
        res.status(200).json(budget)
    } catch (error){
        res.status(400).json({error: error.message})
    }
}


// delete a budget
const deleteBudget = async (req, res) => {
    const {id} = req.params                 //This will grab the id from budget.js the one that has this -> ('/:id',
    if (!mongoose.Types.ObjectId.isValid(id)) {                     // If the budget your looking for isn't
        return res.status(404).json({error: 'No such budget'})      // in the DB, throw this error message
    }

    // This deletes any matching budget, _id is used to access the id of the objects inside mongoose
    // id and _id are not the same, but we store the value of _id into id to use here in our code
    const budget = await Budget.findOneAndDelete({_id: id})

    // If no budget exist to delete, return this message
    if (!budget) {
        return res.status(400).json({error: 'No budget was found to delete'})
    }

    // If the budget is succesfully deleted
    return res.status(200).json(budget)

}


//update a budget
const updateBudget = async (req, res) => {
    const {id} = req.params                 //This will grab the id from budget.js the one that has this -> ('/:id',
    if (!mongoose.Types.ObjectId.isValid(id)) {                     // If the budget your looking for isn't
        return res.status(404).json({error: 'No such budget'})      // in the DB, throw this error message
    }


    const budget = await Budget.findOneAndUpdate({_id: id}, {
        // What every properties are on the body, we will output it here
        // This is to update more effectivle, let the user define what needs to be updated
        // Helps avoid boiler plate code
        ...req.body       
    })

    // If no budget exist to update, return this message    
    if (!budget) {
        return res.status(400).json({error: 'No budget was found to update'})
    }
    
    // If the budget is succesfully updated
    res.status(200).json(budget)
}


// You have to export it manually then call it in the other files that want to use this
module.exports = {
    createBudget,
    getBudget,
    getAllBudgets,
    deleteBudget,
    updateBudget
}