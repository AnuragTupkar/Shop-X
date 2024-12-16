const order = require('../models/order.model'); // Update the path based on your file structure
const userModel = require("../models/user.model")
const Razorpay  = require("razorpay")
const jwt = require("jsonwebtoken");

const razorpay = new Razorpay({
    key_id: "rzp_test_XdnzBK30azVulO",
    key_secret: "nkejXnUlNEIsQjfYVbjj8GvN",
});
// Create a new order
const createOrder = async (req, res) => {
    try {
        const { amount, productId } = req.body;
        console.log("Request body:", req.body);

        const user = await userModel.findOne({ email: req.user.email });
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }
        
        console.log("User ID:", user._id);

        // Create Razorpay order
        const razorpayOrder = await razorpay.orders.create({
            amount: amount * 100, // Razorpay accepts amount in paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        });

        console.log("Razorpay Order:", razorpayOrder);

        // Save order to your database
        const newOrder = await order.create({
            user: user._id,
            amount,
            productId,
            razorpayOrderId: razorpayOrder.id, // Save Razorpay order ID
            status: "Created", // Set initial status
        });

        user.orders.push(newOrder._id);
        await user.save();

        res.status(201).json({ success: true, data: newOrder, razorpayOrder });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('userId', 'name email') // Populate user fields if needed
            .populate('productId', 'name price'); // Populate product fields if needed
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get a single order by ID
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('userId', 'name email')
            .populate('productId', 'name price');
        if (!order) {
            return res.status(404).json({ success: false, error: "Order not found" });
        }
        res.status(200).json({ success: true, data: order });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Update an order
const updateOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        }).populate('userId', 'name email').populate('productId', 'name price');
        if (!updatedOrder) {
            return res.status(404).json({ success: false, error: "Order not found" });
        }
        res.status(200).json({ success: true, data: updatedOrder });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Delete an order
const deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) {
            return res.status(404).json({ success: false, error: "Order not found" });
        }
        res.status(200).json({ success: true, data: deletedOrder });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder
};
