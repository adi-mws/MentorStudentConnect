import express from 'express';
import authenticateJWT from '../middlewares/auth.js';
const router = express.Router();


import { createStudent, loginUser, createAdmin, verifyUserDetails, getAllStudents } from '../controllers/userController.js';

router.post('/student/create', createStudent);
router.post('/alumni/create', createStudent);
router.post('/admin/create', createAdmin);
router.post('/login', loginUser);
router.post('/verify-user', verifyUserDetails);


router.get("/student/get-all", getAllStudents);

export default router;
