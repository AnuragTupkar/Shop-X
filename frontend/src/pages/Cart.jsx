import React, { useState, useEffect } from "react";
import axios from "axios";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  // Fetch the cart when the component mounts
  useEffect(() => {
    fetchCart();
  }, []);

  // Fetch the cart data from the backend
  const fetchCart = async () => {
    try {
      const response = await axios.get('/api/getCart');
      setCartItems(response.data.cart.items); // Assuming the backend returns a 'cart' object with an 'items' array
      setTotalAmount(response.data.cart.totalAmount); // Assuming the backend also returns the 'totalAmount'
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  };

  // Add item to cart
  const addToCart = async (productId, quantity) => {
    try {
      const response = await axios.post('/api/addToCart', { productId, quantity });
      fetchCart(); // Fetch the updated cart
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId) => {
    try {
      const response = await axios.post('/api/removeFromCart', { productId });
      fetchCart(); // Fetch the updated cart
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
    }
  };

  return (
    <div>
      <h1>Your Cart</h1>
      <div>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            {cartItems.map(item => (
              <div key={item.product._id} className="cart-item">
                <img src={item.product.image} alt={item.product.title} />
                <p>{item.product.title}</p>
                <p>Price: {item.product.price} ₹</p>
                <p>Quantity: {item.quantity}</p>
                <button onClick={() => removeFromCart(item.product._id)}>Remove</button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        <h3>Total: {totalAmount} ₹</h3>
        <button onClick={() => console.log("Proceed to Checkout")}>Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default CartPage;
