/**
 * PURPOSE:
 * Manages the model for the Transaction documents.
 */
const mongoose = require('mongoose')

const Schema = mongoose.Schema

/**
 * This is the schema.
 */
const transactionSchema = new Schema({
    /**
     * This is the title/ description of the purchase.
     */
    title: {
        type: String,
        required: true 
    },
    /**
     * The amount of the purchase.
     */
    withdraw:  {
        type: Number,
        required: true
    },
    /**
     * This is the dateId, will be used in organizing transaction items by month.
     */
    dateId: {
        type: Number,
        required: true
    },
    /**
     * This is the user_id the transaction item will be linked to.
     */
    user_id: {
        type: String,
        requried: true
    }
}, { timestamps: true})

module.exports = mongoose.model('Transaction', transactionSchema)