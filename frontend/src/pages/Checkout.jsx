import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

const Checkout = () => {
  const { id } = useParams();
  const [amount, setAmount] = useState(0); // Total amount in INR
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/getSingleProduct/${id}`);
        if (response.data.success) {
          const productData = response.data.data;
          setData(productData);

          // Calculate total price and update the amount
          const shippingCost = productData.price > 500 ? 0 : 200;
          const totalPrice = productData.price + shippingCost;
          setAmount(totalPrice);

          console.log("Fetched data:", productData);
        } else {
          console.error("Error fetching product:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchData();
  }, [id]);

  const placeOrder = async () => {
    try {
      // Create an order on the backend
      const orderDetails = { amount, productId: id };
      console.log("Placing order with product ID:", id);

      const response = await axios.post("/api/createOrders", orderDetails);
      if (response.data.success) {
        console.log("Order created successfully:", response.data.data);

        // Initialize Razorpay Checkout
        const { razorpayOrder } = response.data; // Ensure backend sends `razorpayOrder`
        const options = {
          key: "rzp_test_XdnzBK30azVulO", // Replace with your Razorpay Key ID
          amount: razorpayOrder.amount, // Amount in paise
          currency: razorpayOrder.currency,
          name: "ShopX",
          description: `Payment for Order #${razorpayOrder.id}`,
          order_id: razorpayOrder.id, // Razorpay Order ID
          handler: async (paymentResponse) => {
            console.log("Payment successful:", paymentResponse);

            // Verify payment on the backend
            const verificationResponse = await axios.post("/api/verifyPayment", paymentResponse);
            if (verificationResponse.data.success) {
              alert("Payment Verified Successfully!");
            } else {
              alert("Payment verification failed!");
            }
          },

          theme: {
            color: "#3399cc",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", (response) => {
          alert("Payment Failed!");
          console.error("Payment failure response:", response.error);
        });

        rzp.open();
      } else {
        console.error("Error creating order:", response.data.message);
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div>
      <div className="mx-24">
        <h1 className="text-4xl font-bold uppercase">Billing Details</h1>
        <div className="flex">
          <div className="flex-col mt-10">
            <form className="mr-40">
              <h1>First Name</h1>
              <input
                type="text"
                className="bg-slate-200 rounded-md w-96 h-10"
              />
              <h1>Last Name</h1>
              <input
                type="text"
                className="bg-slate-200 rounded-md w-96 h-10"
              />
              <h1>Address</h1>
              <input
                type="text"
                className="bg-slate-200 rounded-md w-96 h-10"
              />
              <h1>Phone No.</h1>
              <input
                type="text"
                className="bg-slate-200 rounded-md w-96 h-10"
              />
              <h1>Email Address</h1>
              <input
                type="text"
                className="bg-slate-200 rounded-md w-96 h-10"
              />
            </form>
          </div>
          <div className="mt-10">
            <div className="">
              <h1>Subtotal: ${data.price}</h1>
              <h1>Shipping: ${data.price > 500 ? "Free Shipping" : "200"}</h1>
              <h1>Total: ${amount}</h1>
              <button
                onClick={placeOrder}
                className="bg-red-500 py-2 px-4 rounded-lg text-white"
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
