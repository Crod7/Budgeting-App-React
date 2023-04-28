/**
 * This holds the schema for monthly data on the net balance(after monthly expenses) that will be displayed
 * to the user in the frontend. Each user can only hold one monthlyNetBalance object per month. This is 
 * to organize user budgets when a user wishes to see a previous months and their expenses that month. A user
 * can modify their monthly budget and see their previous monthly budgets using the timestamps in the schema.
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const monthlyNetBalanceSchema = new Schema({
    income:  {
        type: Number,
        required: true
    },
    housingCost:  {
        type: Number,
        required: true
    },
    debtCost:  {
        type: Number,
        required: true
    },
    carCost:  {
        type: Number,
        required: true
    },
    phoneCost:  {
        type: Number,
        required: true
    },
    internetCost:  {
        type: Number,
        required: true
    },
    subscriptionCost:  {
        type: Number,
        required: true
    },
    insuranceCost:  {
        type: Number,
        required: true
    },
    utilityCost:  {
        type: Number,
        required: true
    },
    childcareCost:  {
        type: Number,
        required: true
    },
    // This is the user linked to this 
    user_id: {
        type: String,
        requried: true
    }
}, { timestamps: true})

module.exports = mongoose.model('MonthlyNetBalance', monthlyNetBalanceSchema)