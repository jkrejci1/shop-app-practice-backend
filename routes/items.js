const express = require('express')
const router = express.Router()
const { 
    getItems
} = require('../controllers/itemController')

//REMEMBER TO REQUIRE AUTH FOR CERTAIN ROUTER
