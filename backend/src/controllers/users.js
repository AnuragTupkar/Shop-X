const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.userSignUp = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).send("All fields are required");
    }

    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).send("User already exists");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = await userModel.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    // Generate token
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.SECRET_KEY,
      { expiresIn: "1d" } // Token expires in 1 day
    );

    // Send the token as a cookie
    res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
    res.status(201).send("User registered successfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports.userSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).send("Email and password are required");
    }

    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send("Invalid credentials");
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: "1d" } // Token expires in 1 day
    );

    // Send the token as a cookie
    res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
    res.status(200).send("Logged in successfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports.userLogout = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).send("Logged out successfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports.verify = async (req, res) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ success: false, message: "No token, authorization denied" });
  }

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    req.user = verified; // You can store the verified data in the request object for use in other routes
    return res.status(200).json({ success: true, id: verified.id, email: verified.email });
  } catch (err) {
    return res.status(400).json({ success: false, message: "Invalid or expired token" });
  }
};

module.exports.getUserProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id); // Use userModel here
    if (user) {
      res.status(200).json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.getUserInfo = async (req, res) => {
  try {
    // Retrieve the token from cookies
    const token = req.cookies.token;

    // Check if the token exists
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Fetch user details from the database
    const user = await userModel.findById(decoded.id).select("-password"); // Exclude the password field

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Respond with user info
    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role || "user", // Default role to "user" if not defined
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ success: false, message: "Invalid or expired token" });
  }
};