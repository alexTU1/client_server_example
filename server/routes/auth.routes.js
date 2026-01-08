/**
 * @fileoverview Authentication routes delegating to the auth controller.
 * @module auth.routes.js
 */

import express from 'express';
import { register, login } from '../controllers/auth.controller.js';

const router = express.Router();

// Delegate registration and login to controller handlers
router.post('/register', register);
router.post('/login', login);

export default router;