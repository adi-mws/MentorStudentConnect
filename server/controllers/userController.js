import User from '../models/user.js';
import bcrypt, { hashSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Worker } from 'worker_threads';
import { fileURLToPath } from 'url';
import path from 'path';

// Get the current directory dynamically
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Register user
export const createUser = async (req, res) => {
    const { username, password, email, role, name } = req.body;

    try {
        const userExists = await user.findOne({ username, role, email });
        if (userExists) {
            return res.status(400).json({ message: "user already exists" });
        }

    
        const user = await User.create({ username: username, role: role, name: name, password: hashSync(password, 10) });

        
        res.status(200).json({
            message: "user registered successfully",
            user: { id: user._id, email: user.email, }
        });

    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};


// Login user

export const loginuser = async (req, res) => {
    const { username, password, role } = req.body;
    // console.log(email, password); (DEBUGGER)

    try {
        // Await the result of the findOne query
        const user = await user.findOne({ username, role });

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

        res.status(200).json({ message: "user logged in successfully!", token, user: { username: user.username, id: user._id } });
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

