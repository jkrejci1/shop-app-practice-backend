const express = require('express')
const router = express.Router()
const { 
    selectItems,
    getItems
} = require('../controllers/itemController')

//REMEMBER TO REQUIRE AUTH FOR CERTAIN ROUTER (for showing items in a cart)

//Route (SEARCH BAR) to get items according to a item type (when clicking on a page, send the type from that page over to the backend and search for those items (do similar for when making the search bar maybe even this one would work))
//router.get('/:type', selectItems) //WAS KEEPING THE OTHER GET FUNCTION FROM RUNNING MIGHT NEED TO USE OTHER ROUTE FILE FOR THE SEARCH BAR THEN!!!!

//Route to get items according to a specific item name when clicking on an item type card on the home page
router.get('/:itemName', getItems)

//Export router functions to use outisde here
module.exports = router
