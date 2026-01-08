import User from '../models/User.js';

// filepath: /workspaces/client_server_example/server/controllers/user.controller.js

/**
 * @fileoverview User controller for handling user-related operations.
 * @author @alexTU1
 * @version 1.0.0
 * @module user.controller.js
 */

/**
 * Get all users
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({ 
            message: 'Users retrieved successfully', 
            users: users.map(user => user.toJSON()) 
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Get user by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ 
            message: 'User retrieved successfully', 
            user: user.toJSON() 
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Update user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;

        const user = await User.findByIdAndUpdate(
            id, 
            { name, email }, 
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ 
            message: 'User updated successfully', 
            user: user.toJSON() 
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Delete user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
};