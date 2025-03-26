import express from 'express';
import authenticateJWT from '../middlewares/auth.js';
const router = express.Router();


import { createStudent, loginUser, createAdmin, verifyUserDetails, getAlumniDetails, getStudentDetails, getAllStudents, deleteStudent, getAllAlumni, createAlumni } from '../controllers/userController.js';

router.post('/student/create', createStudent);
router.delete('/student/delete/:id',authenticateJWT, deleteStudent);
router.post('/alumni/create', createAlumni);
router.post('/admin/create', createAdmin);
router.post('/login', loginUser);
router.post('/verify-user', verifyUserDetails);

router.get("/student/get-all", authenticateJWT, getAllStudents);
router.get('/student/get/:id', authenticateJWT, getStudentDetails);

router.get("/alumni/get-all", authenticateJWT, getAllAlumni);
router.get('/alumni/get/:id', authenticateJWT, getAlumniDetails);



export default router;
