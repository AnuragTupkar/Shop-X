const express = require("express")
const router = express.Router()
const isLoggedin = require("../middlewares/isLoggedin")

const {userSignUp, userLogout, userSignIn, verify, getUserProfile, getUserInfo} = require("../controllers/users")

router.post("/userSignUp",isLoggedin, userSignUp)
router.post("/userSignIn", userSignIn)
router.get("/userLogout", userLogout)
router.get('/verify', verify);
router.get(`/getUserProfile`, getUserProfile)
router.get("/user-info", getUserInfo);
module.exports =router
