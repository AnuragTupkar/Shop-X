const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
require('dotenv').config();

const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());


// Database connection
const connectDB = require("./db/index");
connectDB();

// Product routes
const productRoutes = require('./routes/products.routes');
const userRoutes = require('./routes/users.routes');
const orderRoutes = require('./routes/orders.routes')
const verifyRoutes = require('./routes/verify.routes')
app.use('/api', productRoutes); // Adjusted the path for specificity
app.use('/api', userRoutes); 
app.use('/api', orderRoutes); 
app.use('/api', verifyRoutes); 
// Test route
app.get('/', (req, res) => {
    res.send('Server is ready');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
