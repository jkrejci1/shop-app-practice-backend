//Model for the user
const mongoose = require('mongoose')

const Schema = mongoose.Schema
const itemSchema = new Schema({
    type: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    price: { //Store ID's of products here and display them in the user's cart
        type: Number,
        required: true
    },
    imgName: {
        type: String
    }

})

//Function to find all the items of a specific item type (when card clicked on home page)
itemSchema.statics.grabItems = async function(itemType) {
    //Query all the items and return all of them
    //console.log("Get item type:", itemType) TEST CODE FOR CONSOLE

    //Use this collection to find what we need to return
    const items = this.find( {
        type: itemType
    })

    //Return whatever items we got that matched
    return items
}

module.exports = mongoose.model('Item', itemSchema)