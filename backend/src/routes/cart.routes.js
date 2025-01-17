const express = require('express');
const router = express.Router();
const  isLoggedin  = require('../middlewares/isLoggedin'); // Middleware for JWT
const {removeFromCart, addToCart, getCart} = require('../controllers/cart');

// Add product to wishlist
router.delete('/removeFromCart', isLoggedin, removeFromCart);

// Remove product from wishlist
router.post('/addToCart', isLoggedin,addToCart);

// Get wishlist
router.get('/getCart', isLoggedin, getCart);

module.exports = router;
