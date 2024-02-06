// pages/api/contact.js
require("dotenv").config();

const dotenv = require("dotenv")
dotenv.config();
const nodemailer = require("nodemailer");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { name, email, subject, message } = req.body;

    // Add your logic for sending emails here
    // Example: You can use a nodemailer library or another email service
    // Replace the following line with the appropriate logic for your use case
    const response = await sendEmail(name, email, subject, message);

    res.status(200).json(response);
  } catch (error) {
    console.error("Error sending email:", error.message);
    res.status(500).json({ error: "Failed to send email" });
  }
}

async function sendEmail(name, email, subject, message) {

  const transporter = nodemailer.createTransport({
    service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  });

  const mailOptions = {
    from: email,
    to: "fmtz.xviii@gmail.com",
    subject: "BIOMX-DB: "+ subject,
    html: `
    <p>This email is auto-generated and forwarded from the site <strong>biomx-db.com</strong>. Please do not reply to this email.</p>
    <p><strong>From:</strong> ${name}</p>
    <p><strong>Message:</strong></p>
    <div style="border: 1px solid #ddd; padding: 10px; margin: 10px 0;">${message}</div>
    <p><strong>Email:</strong> ${email}</p>
  `,
  };

  return await transporter.sendMail(mailOptions);
}
