const mongoose = require('mongoose')

const Schema = mongoose.Schema

const budgetSchema = new Schema({
    title: {                        //Should have a title property, this is a parameter
        type: String,               //should be a string, enforces this schema
        required: true              //the title cannot be null
    },
    withdraw:  {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        requried: true
    }
}, { timestamps: true})

module.exports = mongoose.model('Budget', budgetSchema)