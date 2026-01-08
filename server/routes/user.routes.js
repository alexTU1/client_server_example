/**
 * @fileoverview User routes for user profile management.
 * @author @alexTU1
 * @version 1.0.0
 * @module user.routes.js
 */

import express from 'express';
import {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} from '../controllers/user.controller.js';

const router = express.Router();

// Delegate user routes to controller handlers
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;