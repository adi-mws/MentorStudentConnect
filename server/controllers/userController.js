import User from '../models/user.js'
import bcrypt, { hashSync } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Worker } from 'worker_threads';
import { fileURLToPath } from 'url';
import Alumni from '../models/alumni.js';
import path from 'path';
import Student from '../models/student.js';


//Get the current directory dynamically
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Register user
export const createStudent = async (req, res) => {
    const { username, password, email, role, name, department, joiningYear, registrationNumber } = req.body;
    try {
        const userExists = await User.findOne({ username, role, email });
        if (userExists) {
            return res.status(400).json({ message: "user already exists" });
        }

        const user = await User.create({ username: username, name: name, email: email, password: hashSync(password, 10), role: role });

        const student = await Student.create({ department: department, joiningYear: joiningYear, registrationNumber: registrationNumber, _id: user._id })
        res.status(201).json({
            message: "Student registered successfully",
            user: { id: user._id, email: user.email, }

        });

    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};


export const createAlumni = async (req, res) => {
    const { username, password, email, role, name, department, joiningYear, registrationNumber, graduationYear, organisation } = req.body;

    try {
        // Check if the user already exists
        const userExists = await User.findOne({ username, role, email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create the user account
        const user = await User.create({
            username,
            name,
            email,
            password: hashSync(password, 10),
            role: role
        });

        // Create the alumni profile linked to the user ID
        const alumni = await Alumni.create({
            department,
            joiningYear,
            registrationNumber,
            graduationYear,
            organisation,
            _id: user._id
        });

        res.status(201).json({
            message: "Alumni registered successfully",
            user: { id: user._id, email: user.email }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering alumni', error });
    }
};


export const createAdmin = async (req, res) => {
    const { username, email, role, password, name } = req.body;
    try {
        const userExists = await User.findOne({ username, email, role });
        if (userExists) {
            return res.status(400).json({ message: "user already exists" });
        }
        const user = await User.create({ username: username, name: name, email: email, password: hashSync(password, 10), role: role });

        res.status(201).json({
            message: "Admin registered successfully",
            user: { id: user._id, email: user.email, }
        });

    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
}


export const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        const studentIds = students.map(student => student._id);
        const users = await User.find({ _id: { $in: studentIds } });

        const allStudents = students.map(student => {
            const user = users.find(user => user._id.toString() === student._id.toString());

            return {
                _id: student._id,
                name: user ? user.name : 'N/A',
                department: student.department,
                registrationNumber: student.registrationNumber
            };
        });

        return res.status(200).json({ message: 'All Students sent successfully', students: allStudents });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to fetch students', error: error.message });
    }
};


export const getStudentDetails = async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findById(id);
        const student = await Student.findById(id);

        if (!user || !student) {
            return res.status(400).json({ message: 'Failed to fetch student', error: error.message });
        }
        const studentDetails = {
            _id: user._id,
            name: user.name,
            email: user.email,
            username: user.username,
            department: student.department,
            joiningYear: student.joiningYear,
            registrationNumber: student.registrationNumber
        }

        return res.status(200).json({ message: 'Student Details sent successfully', studentDetails: studentDetails })
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}


export const getAlumniDetails = async (req, res) => {
    const { id } = req.params;

    try {
        // Fetch user and alumni details by ID
        const user = await User.findById(id);
        const alumni = await Alumni.findById(id);

        if (!user || !alumni) {
            return res.status(404).json({ message: 'Alumni not found' });
        }

        // Combine alumni and user details
        const alumniDetails = {
            _id: user._id,
            name: user.name,
            email: user.email,
            username: user.username,
            department: alumni.department,
            registrationNumber: alumni.registrationNumber,
            joiningYear: alumni.joiningYear,
            graduationYear: alumni.graduationYear,
            organisation: alumni.organisation
        };

        return res.status(200).json({
            message: 'Alumni details sent successfully',
            alumniDetails: alumniDetails
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
};



export const deleteStudent = async (req, res) => {
    const { id } = req.params;

    try {
        const student = await Student.findById(id);

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        await Student.findByIdAndDelete(id);
        await User.findByIdAndDelete(id);

        return res.status(200).json({ message: 'Student deleted successfully' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to delete student and user', error: error.message });
    }
};



export const getAllAlumni = async (req, res) => {
    try {
        const alumniProfiles = await Alumni.find();
        const alumniIds = alumniProfiles.map(alumni => alumni._id);

        const users = await User.find({ _id: { $in: alumniIds } });

        if (!alumniProfiles.length || !users.length) {
            return res.status(404).json({ message: 'No alumni found' });
        }

        const allAlumni = alumniProfiles.map(alumni => {
            const user = users.find(user => user._id.toString() === alumni._id.toString());

            return {
                _id: alumni._id,
                name: user ? user.name : 'N/A',
                email: user ? user.email : 'N/A',
                department: alumni.department,
                registrationNo: alumni.registrationNo,
                joiningYear: alumni.joiningYear,
                graduationYear: alumni.graduationYear,
                organisation: alumni.organisation
            };
        });

        return res.status(200).json({ message: 'All alumni fetched successfully', alumni: allAlumni });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to fetch alumni', error: error.message });
    }
};


export const getAllMentors = async (req, res) => {
    try {
        const users = await User.findAll({ role: 'mentor' });
        if (!users) {
            return res.status(404).json({ message: 'Users not found' });
        }
        return res.status(200).json({ message: 'All Mentors sent successfully', mentors: users });
    } catch (e) {
        console.error(e);
    }
}


// Login user

export const loginUser = async (req, res) => {
    const { username, password, role } = req.body;
    // console.log(email, password); (DEBUGGER)

    try {
        // Await the result of the findOne query
        const user = await User.findOne({ username, role });

        if (!user) {
            return res.status(401).json({ message: 'Invalid Credentials' });
        }

        // console.log(user.email); {DEBUGGER}

        // Compare the provided password with the hashed password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        // console.log(isPasswordMatch); {DEBUGGER}

        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid Credentials' });
        }

        // Generate a token
        const token = generateToken(user._id);

        res.status(200).json({ message: "user logged in successfully!", token, user: { username: user.username, name: user.name, id: user._id, role: user.role } });
    } catch (error) {
        console.error('Error during login:', error); // Log the error for debugging
        res.status(500).json({ message: 'Error logging in user' });
    }
};


// Forgot Password user
export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        // Checking if the user exists
        const user = await user.findOne({ email }); // Corrected `findOne`
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }

        // Generating password reset token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Token valid for 1 hour

        // Generating reset link
        const resetLink = `http://localhost:5173/user-reset-password/${token}`;

        // Preparing email content
        const subject = "Password Reset Request";
        const text = `You requested a password reset. Use the following link to reset your password: ${resetLink}`;
        const html = `<p>You requested a password reset. Click the link below to reset your password:</p>
                      <a href="${resetLink}">Reset Password</a>`;

        const workerPath = path.resolve(process.cwd(), 'services/emailWorker.js');

        const worker = new Worker(workerPath);

        worker.on('message', (message) => {
            if (message.success) {
            } else {
                console.error('Error sending email:', message.error);
            }
        });

        worker.on('error', (error) => {
            console.error('Worker thread error:', error);
        });

        worker.postMessage({
            from: process.env.EMAIL_USER,
            to: email,
            subject,
            text,
            html
        });

        res.status(200).json({ message: 'Password reset link sent successfully!' });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: "An error occurred while processing your request" });
    }
};


export const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        // Verify the token
        const decodeduser = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodeduser) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }

        // Hash the new password
        const hashPassword = hashSync(password, 10);

        // Update the password in the database
        const updateduser = await User.findByIdAndUpdate(
            decodeduser.userId,
            { password: hashPassword },
            { runValidators: true, new: true }
        );

        if (!updateduser) {
            return res.status(404).json({ message: "user not found" });
        }

        const subject = 'Password Reset Successfully ✔';
        const text = "Your password has been successfully updated. \nThanks for updating your password.";
        const html = `<h1>Hello,</h1><p>Your password has been successfully updated.</p><p>Best regards,</p>`;


        const workerPath = path.resolve(__dirname, '../services/emailWorker.js');

        // Create a worker thread
        const worker = new Worker(workerPath);

        worker.on('message', (message) => {
            if (message.success) {
                // console.log('Email sent successfully'); ${DEBUGGER}
            } else {
                console.error('Email send error:', message.error);
            }
        });

        worker.on('error', (error) => {
            console.error('Worker thread error:', error);
        });

        // Send email details to the worker
        worker.postMessage({
            from: process.env.EMAIL_USER,
            to: updateduser.email,
            subject,
            text,
            html
        });

        return res.status(200).json({ message: 'Password successfully updated' });

    } catch (error) {
        console.error('Error during password reset:', error);
        return res.status(500).json({ message: "An error occurred while resetting the password" });
    }
};
export const logoutuser = async (req, res) => {
    res.status(200).json({ message: 'Logged out successfully' });
}

// Generate JWT Token
export const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};







export const verifyUserDetails = async (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer token
    if (!token) {
        return res.status(403).json({ message: 'Access denied, no token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        try {
            const user = await User.findById(decoded.userId);

            if (!user) {
                return res.status(404).json({ message: 'user not found' });
            }


            res.status(200).json({
                id: user._id,
                username: user.username,
                role: user.role,
                email: user.email,
                name: user.name
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching user data', error });
        }
    });
};

