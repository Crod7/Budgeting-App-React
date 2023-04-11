
const mongoose = require('mongoose')                               // This connects to the online database.

const bcrypt = require('bcrypt')                                   // This encrypts user passwords

const validator = require('validator')                             // This package will validate emails

const Schema = mongoose.Schema

// The user schema requires an email and password to make.
const userSchema = new Schema({
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

// Static signup method: the user will use this to sign up.
userSchema.statics.signup = async function(email, password) {      // How to create an addtional method on a static model
    
    if (!email || !password){                                      // Catches an error if fields left blank
        throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)){                                // Checks to see if email is valid
        throw Error('Email is not valid')
    }
    if (!validator.isStrongPassword(password)){                    // Checks to see if password is strong enough
        throw Error('Password not strong enough')
    }

    
    const exists = await this.findOne({email})                     // Checks to see if an email already "exists" in the database
    if (exists){                                                   // If it does exists throw an Error
        throw Error("Email already in use.")
    }
    
    const salt = await bcrypt.genSalt(10)                          // Generates a salt to be added at the end of every password
    const hash = await bcrypt.hash(password, salt)                 // Will hash the user's unique password

    const user = await this.create({email, password: hash})        // This will create the user with their unique email and password

    return user                                                    // Returns the user to the source that called this method




}


module.exports = mongoose.model('User', userSchema)
