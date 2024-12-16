const mongoose = require("mongoose")

const ownerModel = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    }
})

module.exports = mongoose.model("owner", ownerModel)