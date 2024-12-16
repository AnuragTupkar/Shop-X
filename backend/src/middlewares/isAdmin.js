const jwt = require('jsonwebtoken');

const isAdmin = (req, res, next) => {
  // Get token from cookie
  const token = req.cookies.token; 

  if (!token) {
    return res.status(401).json({ success: false, message: "No token, authorization denied" });
  }

  try {
    // Verify the token
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    req.user = verified;

    // Check if the user has the admin role
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: "Access forbidden: Admins only" });
    }

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    return res.status(400).json({ success: false, message: "Invalid or expired token" });
  }
};


module.exports = isAdmin;
