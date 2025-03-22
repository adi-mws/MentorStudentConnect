import express from 'express';
import authenticateJWT from '../middlewares/auth.js';
const router = express.Router();


import { createUser, loginUser, logoutUser, verifyUserDetails } from '../controllers/adminController.js';

router.post('/create-admin', registerAdmin);
router.post('/login-admin', loginAdmin);
router.post('/logout-admin', verifyUserDetails);
router.post('/logout-admin', authenticateJWT, logoutAdmin)

export default router;
