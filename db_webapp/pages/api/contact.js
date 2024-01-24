// pages/api/contact.js
require("dotenv").config();
const dotenv = require("dotenv")
dotenv.config();
import axios from "axios";
const nodemailer = require("nodemailer");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { email, subject, message } = req.body;

    // Add your logic for sending emails here
    // Example: You can use a nodemailer library or another email service
    // Replace the following line with the appropriate logic for your use case
    const response = await sendEmail(email, subject, message);

    res.status(200).json(response);
  } catch (error) {
    console.error("Error sending email:", error.message);
    res.status(500).json({ error: "Failed to send email" });
  }
}

async function sendEmail(email, subject, message) {
  // Implement your email sending logic here
  // Example using nodemailer
  // Replace the following lines with the appropriate logic for your use case


  const transporter = nodemailer.createTransport({
    service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  });

  const mailOptions = {
    from: email,
    to: "317520668@gmail.com",
    subject: subject,
    text: message,
  };

  return await transporter.sendMail(mailOptions);
}
