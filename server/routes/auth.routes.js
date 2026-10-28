import express from 'express';
import { registerAdmin, loginAdmin, getMe } from '../controllers/auth.controller.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/me', protectAdmin, getMe);

export default router;
