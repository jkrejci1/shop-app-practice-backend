//Controller for user stuff

//Get user model
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')


//Function for creating tokens for later (pass in something unique for the token to use, we'll use a user id stored in mongo -> will be a part of the payload)
const createToken = (_id) => {
    //WE NEED TO MANUALLY ENTER .ENV DATA WHEN POSTING TO AZURE -> NEED TO CREATE OUR ENV INFORMATION IN THE AZURE PORTAL FOR THE APP ITSELF IF YOU WANT TO USE .env FILES IN AN AZURE APP (it will run fine locally but Azure won't be able to access the .env file)
    return jwt.sign({_id}, process.env.SECRET || "nayfuaskjf01013eubreiwgfbn1238173tgrebu", { expiresIn: '3d' }) //Take in payload unique thing and secret code (keep it secret -> use in .env as SECRET) and takes when it expires in days here
}



//login user
const loginUser = async (req, res) => {
    //Grab the email and password from req body
    const {email, password} = req.body

    //Try to login the user
    try {
        const user = await User.login(email, password)

        //Create a token
        const token = createToken(user._id)

        //Token is the header, payload, secret encoded
        res.status(200).json({email, token}) //Send back 200 status with email and user
    } catch(error) {
        //Respond if error if there was one
        res.status(400).json({error: error.message})
    }
}

//signup user
const signupUser = async (req, res) => {
    //Grab email and password
    const { email, password } = req.body

    console.log("SIGNUP:", email)

    //Need to sign them up in try catch incase there was an error
    try {
        const user = await User.signup(email, password)

        //Create a token
        const token = createToken(user._id)

        //Token is the header, payload, secret encoded
        res.status(200).json({email, token}) //Send back 200 status with email and user
    } catch(error) {
        //Respond if error if there was one
        res.status(400).json({error: error.message})
    }
}

module.exports = { signupUser, loginUser }