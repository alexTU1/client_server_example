import User from '../models/User.js';

// filepath: /workspaces/client_server_example/server/controllers/auth.controller.js
/**
 * @fileoverview Authentication controller for handling user login and registration logic.
 * @author @alexTU1
 * @version 1.0.0
 * @module auth.controller.js
 */


/**
 * Register a new user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // Create new user
        const newUser = new User({ name, email, password });
        await newUser.save();

        res.status(201).json({ 
            message: 'User registered successfully', 
            user: newUser.toJSON() 
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Login a user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare passwords
        const isPasswordValid = await user.comparePasswords(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({ 
            message: 'Login successful', 
            user: user.toJSON() 
        });
    } catch (error) {
        next(error);
    }
};