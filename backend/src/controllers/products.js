const Product = require("../models/product.model");

// Create a new product
exports.createProduct = async (req, res) => {
  
  try {
    const { title, price, image, iamgeOne, imageTwo, imageThree, imageFour, catagory, description } = req.body;
    const response = await Product.create({ title, price, image, iamgeOne, imageTwo, imageThree, imageFour, catagory, description  });
    res.status(200).json({
      success: true,
      data: response,
      message: "Entry Created Successfully",
    });
  } catch (error) {
    console.log("Error: " + error);
    res.status(500).json({
      success: false,
      data: "Internal server error",
      message: error.message,
    });
  }
};

// Get all products
exports.getAllProduct = async (req, res) => {
  try {
    const response = await Product.find();
    res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.log("Error: " + error);
    res.status(500).json({
      success: false,
      data: "Internal server error",
      message: error.message,
    });
  }
};

// Get a single product by ID
exports.getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params; // Get ID from request params
    const response = await Product.findById(id);
    if (!response) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.log("Error: " + error);
    res.status(500).json({
      success: false,
      data: "Internal server error",
      message: error.message,
    });
  }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params; // Get ID from request params
    const { title, price, image } = req.body;
    const response = await Product.findByIdAndUpdate(
      id,
      { title, price, image },
      { new: true } // Return the updated document
    );
    if (!response) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      data: response,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.log("Error: " + error);
    res.status(500).json({
      success: false,
      data: "Internal server error",
      message: error.message,
    });
  }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params; // Get ID from request params
    const response = await Product.findByIdAndDelete(id);
    if (!response) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log("Error: " + error);
    res.status(500).json({
      success: false,
      data: "Internal server error",
      message: error.message,
    });
  }
};

