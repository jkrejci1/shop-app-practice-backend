//Model for the user
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true //Need a unique email to sign up with that isn't already used
    },
    password: {
        type: String,
        required: true
    },
    cart: { //Store ID's of products here and display them in the user's cart
        type: Array,
        required: true
    }
})

//Static method to call whenever we want to signup a user
//This creates new methods similar to find() findOne() etc
//So then we can all this method whenever we want to save a user to the DB
//So this would be called with <whatever>.signup()
//Also can't use the arrow function here because we are using the "this" keyword -> Before changing I got an error saying findOne() isn't a function
userSchema.statics.signup = async function(email, password) {
    //Validation
    //Throw error if there wasn't given a email or password
    if (!email || !password) {
        throw Error("All fields must be filled!")
    }
    //Check if the email is a valid email
    if (!validator.isEmail(email)) {
        throw Error("Invalid email!")
    }
    //Check if the password is strong enough
    if (!validator.isStrongPassword(password)) {
        throw Error("Password not strong enough!")
    }

    //Don't sign them up if the email already existed
    const exists = await this.findOne({ email }) //this -> refers to the current model, same as using User.findOne() anywhere else in the project; can't do that here because we export it from here so it doesn't exist at this point
    if(exists) {
        throw Error("Email already in exists!") //Don't have access to the response so we throw an error
    }

    //If not hash the password and save the user

    //Generate salt to combine with password USE AWAIT AS THIS TAKES A MIN -> MAKES SURE EVERYTHING ELSE IS LOADED OR STAYS LOADED BEFORE FINSIHGIN THIS
    const salt = await bcrypt.genSalt(10) //Pass in number of rounds or cost of salt the higher the better but the longer it takes to sign up
    const hash = await bcrypt.hash(password, salt) //Hash the password with the salt

    //Now store the user in the database with their hashed password
    const user = await this.create({ email, password: hash }) //Remember the format for model storing goes { attribute: name } -> But if the attribute in the name are the same, then we don't have to do it in that format like for email in this case

    return user //Return the user as we will be calling it from elseware -> the controller
}

//Create static function for the login process
userSchema.statics.login = async function(email, password) {
    //Check if email and password has a value
    //Throw error if there wasn't given a email or password
    if (!email || !password) {
        throw Error("All fields must be filled!")
    }

    //Try and find the user email in the database
    const user = await this.findOne({ email }) //this -> refers to the current model, same as using User.findOne() anywhere else in the project; can't do that here because we export it from here so it doesn't exist at this point
    if(!user) {
        throw Error("Incorrect email!") //Don't have access to the response so we throw an error
    }

    //See if the bcrypted password matches the one that was hashed and stored
    //Use compare package in bcrypt
    const match = await bcrypt.compare(password, user.password) //Give the two you want to compare

    //Give error if the password given didn't match the one stored for the existing user
    if (!match) {
        throw Error("Incorrect password!")
    }

    //If the password to match return the user
    return user
}

module.exports = mongoose.model('User', userSchema)