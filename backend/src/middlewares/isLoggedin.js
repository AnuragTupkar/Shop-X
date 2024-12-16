const jwt = require("jsonwebtoken");

const isLoggedIn = (req, res, next) => {
    try {
        // Check if token exists (from cookies or authorization header)
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Authentication required. Please log in." });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        // Attach user information to the request object
        req.user = decoded;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error(error.message);
        return res.status(403).json({ message: "Invalid or expired token." });
    }
};

module.exports = isLoggedIn;
