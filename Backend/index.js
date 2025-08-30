// index.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// Import routes
import bookRoutes from './route/book.route.js';
import userRoutes from './route/user.route.js';
import orderRoutes from './route/order.route.js';

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 4001; // Use port from .env or default to 4001
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(express.json()); // Body parser for JSON requests
app.use(cors()); // Enable CORS for all origins (adjust for production)

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB Connected successfully!');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        // Exit process with failure
        process.exit(1);
    }
};

connectDB();

// Define API routes
app.use('/books', bookRoutes); // Routes for book management
app.use('/user', userRoutes); // Routes for user authentication (signup, login)
app.use('/orders', orderRoutes);

// Simple root route
app.get('/', (req, res) => {
    res.send('Bookstore Backend API is running!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});