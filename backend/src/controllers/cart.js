const Cart = require("../models/cart.model");
const Product = require("../models/product.model");
const User = require("../models/user.model");

module.exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Check if the user is authenticated
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    // Find the product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Find the user's cart
    let cart = await Cart.findOne({ user: req.user.id });

    // If no cart exists, create a new one
    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
    }

    // Check if the product is already in the cart
    const existingItem = cart.items.find(item => item.product.toString() === productId);
    if (existingItem) {
      // Update the quantity if the product is already in the cart
      existingItem.quantity += quantity;
    } else {
      // Otherwise, add the new item to the cart
      cart.items.push({ product: productId, quantity });
    }

    // Recalculate the total price of the cart
    const productsInCart = await Product.find({ '_id': { $in: cart.items.map(item => item.product) } });
    const total = cart.items.reduce((acc, item) => {
      const product = productsInCart.find(p => p._id.toString() === item.product.toString());
      return acc + (product.price * item.quantity);
    }, 0);

    // Update the cart total
    cart.total = total;

    // Save the cart
    await cart.save();

    // Respond with the updated cart
    res.status(200).json({ cart });
  } catch (error) {
    console.error('Failed to add item to cart:', error);
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
};

  module.exports.removeFromCart = async (req, res) => {
    try {
      const { productId } = req.body;
      const cart = await Cart.findOne({ user: req.user.id });
  
      cart.items = cart.items.filter(item => item.product.toString() !== productId);
      await cart.save();
  
      // Recalculate total
      const products = await Product.find({ '_id': { $in: cart.items.map(item => item.product) } });
      const total = cart.items.reduce((acc, item) => {
        const product = products.find(p => p._id.toString() === item.product.toString());
        return acc + (product.price * item.quantity);
      }, 0);
  
      cart.total = total;
      await cart.save();
  
      res.status(200).json({ cart });
    } catch (error) {
      res.status(500).json({ error: 'Failed to remove item from cart' });
    }
  };
  
  module.exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
      res.status(200).json({ cart });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch cart data' });
    }
  };
  