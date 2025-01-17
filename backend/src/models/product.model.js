const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true
    },
    price:{
        type: Number,
        require: true
    },
    image:{
        type:String,
        require:true
    },
    imageOne:{
        type:String,
    },
    imageTwo:{
        type:String,
    },
    imageThree:{
        type:String,
    },
    imageFour:{
        type:String,
    },
    catagory:{
        type:String,
        requrie: true,
    },
    description:{
        type:String,
        require:true
    }
}, { timestamps: true })

module.exports = mongoose.model("product", productSchema)