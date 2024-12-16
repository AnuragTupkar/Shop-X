const mongoose = require("mongoose")

const cartModel = new mongoose.Schema({
    productId:
    [
        {
            type: mongoose.Schema.ObjectId,
            ref:"product"
        }
    ],
    qty:{
        type: Number,
        default: 0
    }
})

module.exports =  ("cart", cartModel)