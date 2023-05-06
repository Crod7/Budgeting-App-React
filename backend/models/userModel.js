/**
 * PURPOSE:
 * Manages the model for user documents.
 */
const mongoose = require('mongoose')                               // This connects to the online database.
const bcrypt = require('bcrypt')                                   // This encrypts user passwords
const validator = require('validator')                             // This package will validate emails

const Schema = mongoose.Schema

/**
 * This is the User Schema.
 */
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

/**
 * Static signup method: the user will use this to sign up.
 * @returns The user will be added to the database if all chekcs are passed.
 */
userSchema.statics.signup = async function(firstName, lastName, email, password) {
    /**
     * The if statments check to make sure the user input is valid.
     */
    if (!email || !password || !firstName || !lastName){
        throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)){
        throw Error('Email is not valid')
    }
    if (!validator.isStrongPassword(password)){
        throw Error('Password not strong enough')
    }

    /**
     * Checks to see if the email already exists. If it does, it throws an error.
     */
    const exists = await this.findOne({email})
    if (exists){
        throw Error("Email already in use.")
    }
    /**
     * This will generate a salt and add it to the end of a password. Then the password gets hashed.
     */
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    /**
     * Will create the user and return it to the database.
     */
    const user = await this.create({firstName, lastName, email, password: hash, balance: 0})
    return user
}
/**
 * This is the login method.
 */
userSchema.statics.login = async function( email, password){
    /**
     * Checks to make sure the input entered by the end user is valid and will match a user
     * already inside the database with correct information.
     */
    if (!email || !password){
        throw Error('All fields must be filled')
    }
    const user = await this.findOne({email})
    if (!user){
        throw Error("Incorrect email")
    }
    /**
     * Compares the entered password to the password of a matching email, returns true if it matches.
     * Throws an error if it doesn't.
     */
    const match = await bcrypt.compare(password, user.password)
    if (!match){
        throw Error('Incorrect password')
    }
    /**
     * Return the user if the login process is successful.
     */
    return user
}

module.exports = mongoose.model('User', userSchema)
