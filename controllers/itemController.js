//Simple home grab
const Item = require('../models/itemModel')

//Function for getting items according to a type name
const selectItems = async (req, res) => {
    //Take the item type name given from the front end, and return all the items that having a matching type name
    //LEFT OFF HERE
}

//Function for getting every single item BY TITLE GIVEN FROM CLICKING IMAGES to be sent over to the frontend
const getItems = async (req, res) => {
    const { itemName } = req.params

    //Try to get the items
    try {
        //Try and get all the items and store them in items to be returned to the front end
        const items = await Item.grabItems(itemName)

        res.status(200).json(items) //Send back 200 status with item data
    } catch(error) {
        //Respond error if there was one
        res.status(400).json({error: error.message})
    }
}

module.exports = { selectItems, getItems }