// controller/user.controller.js
import User from '../model/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const signup = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create new user (password is hashed by pre-save hook in model)
        user = new User({ fullname, email, password, role: 'user' }); // Default role is 'user'
        await user.save();

        // Generate JWT
        const payload = {
            user: {
                id: user.id,
                role: user.role // Include role in token payload
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' }, // Token valid for 1 hour
            (err, token) => {
                if (err) throw err;
                res.status(201).json({
                    message: "Signup Successful",
                    token,
                    user: { // Send back user details including isAdmin for frontend
                        _id: user.id,
                        fullname: user.fullname,
                        email: user.email,
                        role: user.role,
                        isAdmin: user.role === 'admin' // Explicitly add isAdmin for frontend check
                    },
                });
            }
        );
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Server Error during signup", error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // Check password
        const isMatch = await user.comparePassword(password); // Using method from user.model.js
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // Generate JWT
        const payload = {
            user: {
                id: user.id,
                role: user.role // Include role in token payload
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.status(200).json({
                    message: "Login Successful",
                    token,
                    user: { // Send back user details including isAdmin for frontend
                        _id: user.id,
                        fullname: user.fullname,
                        email: user.email,
                        role: user.role,
                        isAdmin: user.role === 'admin' // Explicitly add isAdmin for frontend check
                    },
                });
            }
        );
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Server Error during login", error: error.message });
    }
};
// Promote a user to admin (admin-only)
export const promoteToAdmin = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.role = 'admin';
        user.isAdmin = true;
        await user.save();

        res.status(200).json({ message: "User promoted to admin", user });
    } catch (error) {
        res.status(500).json({ message: "Failed to promote user", error: error.message });
    }
};
