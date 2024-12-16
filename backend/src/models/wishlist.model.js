const mongoose = require("mongoose")

const wishlistModel = new mongoose.Schema({
    productId:
    [
        {
            type: mongoose.Schema.ObjectId,
            ref:"product"
        }
    ],
    
})

module.exports =  ("wishlist", wishlistModel)