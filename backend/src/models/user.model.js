const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        min: 6,
        required: [true, "Minimum 6 character is required"]
    },
    orders: [
        { type: mongoose.Schema.Types.ObjectId, ref: "order" }
    ],
    wishlist:[
        {type: mongoose.Schema.Types.ObjectId, ref: "product"}
    ],
    role: { type: String, default: 'user' }
}, { timestamps: true })

const userModel = mongoose.model("user", userSchema)

module.exports = userModel