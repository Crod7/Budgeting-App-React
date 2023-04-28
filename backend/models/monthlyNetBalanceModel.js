/**
 * PURPOSE:
 * This holds the schema for monthly data on the net balance(after monthly expenses) that will be displayed
 * to the user in the frontend. Each user can only hold one monthlyNetBalance object per month. This is 
 * to organize user budgets when a user wishes to see a previous months and their expenses that month. A user
 * can modify their monthly budget and see their previous monthly budgets using the dateId in the schema.
 */


const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * This is the schema for the monthlyNetBalance documents.
 */
const monthlyNetBalanceSchema = new Schema({
    /**
     * This is the net balance after all expenses have been deducted.
     */
    balance: {
        type: Number,
        required: true
    },
    /**
     * This is the dateId, will be used in organizing monthlyNetBalance items by month.
     */
    dateId: {
        type: Number,
        required: true
    },
    /**
     * This is the user_id the monthlyNetBalance item will be linked to.
     */
    user_id: {
        type: String,
        requried: true
    }
}, { timestamps: true})

module.exports = mongoose.model('MonthlyNetBalance', monthlyNetBalanceSchema)