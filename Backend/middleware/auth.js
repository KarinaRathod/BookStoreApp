// middleware/auth.js
import jwt from 'jsonwebtoken';
import User from '../model/user.model.js'; // Adjust path if necessary
import dotenv from 'dotenv';

dotenv.config();

// Middleware to verify JWT token and attach user to req
export const protect = async (req, res, next) => {
    // Get token from header
    const token = req.header('x-auth-token'); // Common header name for JWT

    // Check if no token
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Attach user from token payload to request (contains id and role)
        req.user = decoded.user; 
        
        // Optional: Fetch full user object from DB to ensure it's still valid
        // and to get the latest user data (e.g., if role changes)
        const userFromDB = await User.findById(req.user.id).select('-password');
        if (!userFromDB) {
            return res.status(401).json({ message: 'Token is invalid, user not found' });
        }
        req.user = userFromDB; // Use the full user object from DB

        next(); // Proceed to the next middleware/route handler
    } catch (err) {
        console.error("Token verification error:", err.message);
        res.status(401).json({ message: 'Token is not valid' });
    }
};

// Middleware to authorize only admin users
export const authorizeAdmin = (req, res, next) => {
    // 'req.user' should be populated by the 'protect' middleware
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied: You are not authorized to perform this action.' });
    }
    next(); // User is an admin, proceed
};