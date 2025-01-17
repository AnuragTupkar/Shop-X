const User = require('../models/user.model');

// Add Product to Wishlist
module.exports.addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    console.log(productId)
    const user = await User.findById(req.user.id);

    if (!user.wishlist.includes(productId)) {
      user.wishlist.push(productId);
      await user.save();
      return res.status(200).json({ message: 'Product added to wishlist', wishlist: user.wishlist });
    }

    res.status(400).json({ message: 'Product already in wishlist' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Remove Product from Wishlist
module.exports.removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user.id);

    user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
    await user.save();

    res.status(200).json({ message: 'Product removed from wishlist', wishlist: user.wishlist });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get User Wishlist
module.exports.getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('wishlist'); // Populate Product details
    res.status(200).json({ wishlist: user.wishlist });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
