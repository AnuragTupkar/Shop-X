const mongoose = require('mongoose');

// Define the cart schema
const cartSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', // Reference to the User model
    required: true 
  },
  items: [
    {
      product: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product', // Reference to the Product model
        required: true 
      },
      quantity: {
        type: Number,
        required: true,
        min: 1 // Ensures quantity is always at least 1
      }
    }
  ],
  totalAmount: { 
    type: Number, 
    default: 0 
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Calculate the total price whenever cart items are modified
cartSchema.pre('save', async function (next) {
  const cart = this;
  
  // Fetch the product details to calculate the total
  const productIds = cart.items.map(item => item.product);
  const products = await mongoose.model('Product').find({ '_id': { $in: productIds } });

  // Recalculate total price
  let total = 0;
  cart.items.forEach(item => {
    const product = products.find(product => product._id.toString() === item.product.toString());
    if (product) {
      total += product.price * item.quantity;
    }
  });

  cart.totalAmount = total;
  
  next();
});

// Create a model for the Cart
const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
