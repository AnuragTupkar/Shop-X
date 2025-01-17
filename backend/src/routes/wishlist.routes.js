const express = require('express');
const router = express.Router();
const  isLoggedin  = require('../middlewares/isLoggedin'); // Middleware for JWT
const {addToWishlist,removeFromWishlist,getWishlist} = require('../controllers/wishlist');

// Add product to wishlist
router.post('/addWishlist', isLoggedin, addToWishlist);

// Remove product from wishlist
router.post('/removeWishlist', isLoggedin,removeFromWishlist);

// Get wishlist
router.get('/getWishList', isLoggedin, getWishlist);

module.exports = router;
