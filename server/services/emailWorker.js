import { parentPort } from 'worker_threads';
import nodemailer from 'nodemailer';

// Create a Nodemailer transporter with Gmail SMTP settings
export const transporter = nodemailer.createTransport({
  service: 'gmail',  // Gmail's service name
  auth: {
    user: process.env.EMAIL_USER,  // Your Gmail address (from .env file)
    pass: process.env.EMAIL_PASS,  // Your Gmail app-specific password (from .env file)
  },
});

// Listen for messages from the parent thread
parentPort.on('message', async ({ from, to, subject, html, text }) => {
  try {
    // Set up email options
    const mailOptions = {
      from,       // Sender's email
      to,         // Recipient's email
      subject,    // Email subject
      text,       // Plain text body
      html,       // HTML body (optional)
    };

    // Send the email using the configured transporter
    await transporter.sendMail(mailOptions);
    
    // Send a success message back to the parent thread
    parentPort.postMessage({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    
    // Send an error message back to the parent thread with error details
    parentPort.postMessage({ success: false, error: error.message });
  }
});
