const crypto = require("crypto");
const orderModel = require('../models/order.model');
const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        // Generate signature
        const generatedSignature = crypto
            .createHmac("sha256", "nkejXnUlNEIsQjfYVbjj8GvN")
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (generatedSignature !== razorpay_signature) {
            return res.status(400).json({ success: false, message: "Invalid signature" });
        }

        // Update order status
        const order = await orderModel.findOneAndUpdate(
            { razorpayOrderId: razorpay_order_id },
            { status: "Paid", razorpayPaymentId: razorpay_payment_id },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ success: false, error: "Order not found" });
        }

        res.status(200).json({ success: true, message: "Payment verified", order });
    } catch (error) {
        console.error("Error verifying payment:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};
module.exports = {
    verifyPayment
};
