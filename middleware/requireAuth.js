//Used to verify the token
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

//Middleware that checks for user for certain routes
const requireAuth = async (req, res, next) => {

    //Verify authentication (one of those header properties is the authorization property)
    const { authorization } = req.headers //So that would contain possible JWT

    if (!authorization) {
        return res.status(401).json({error: "Authorization token required"})
    }

    //Value of authorization would contain the token -> Bearer <token> -> we want just the <token> so lets split this string to get just the token, then the second element will be the token
    const token = authorization.split(' ')[1] //Seperated by a space and the token would be the second element

    //Verify the token is valid
    try {
        //Try to verify the token
        //Grab the id from that token
        const { _id } = jwt.verify(token, process.env.SECRET || "nayfuaskjf01013eubreiwgfbn1238173tgrebu") //Make this just SECRET when figured out env variables on Azure

        //If we got the token get the user
        req.user = await User.findOne({ _id }).select('_id')
        next() //Fire the next handler function

    } catch (error) {
        console.log(error)
        res.status(401).json({error: "Request not authorized"})

    }
}

//Export the function
module.exports = requireAuth