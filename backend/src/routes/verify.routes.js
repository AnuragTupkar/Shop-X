const express = require("express")
const router = express.Router()

const {verifyPayment}= require("../controllers/payment")

router.post("/verifyPayment", verifyPayment)

module.exports = router