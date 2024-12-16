const express = require('express');
const router = express.Router();
const {createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder}=require('../controllers/orders'); // Update the path based on your file structure
const isLoggedin = require("../middlewares/isLoggedin")

router.post('/createOrders',isLoggedin, createOrder);
router.get('/getAllOrders', getAllOrders);
router.get('/getOrderById/:id', getOrderById);
router.put('/updateOrder/:id', updateOrder);
router.delete('/deleteOrder/:id', deleteOrder);

module.exports = router;
