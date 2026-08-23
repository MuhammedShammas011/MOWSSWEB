require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Nodemailer Transporter Setup
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER, 
    pass: process.env.SMTP_PASS, 
  },
});

// Verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log('SMTP Connection Error:', error);
  } else {
    console.log('Server is ready to take our messages');
  }
});

// Endpoint: Contact Form Submission
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, company, message } = req.body;

  const mailOptions = {
    from: `"Mows Website" <${process.env.SMTP_USER}>`,
    to: process.env.RECEIVER_EMAIL || process.env.SMTP_USER,
    subject: `New Contact Request from ${name}`,
    text: `
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Company: ${company}
      Message: ${message}
    `,
    html: `
      <h2>New Contact Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Company:</strong> ${company}</p>
      <p><strong>Message:</strong> ${message}</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send message.' });
  }
});

// Endpoint: Booking Form Submission
app.post('/api/booking', async (req, res) => {
  const { name, email, phone, space, location, duration, startDate, message } = req.body;

  const mailOptions = {
    from: `"Mows Booking" <${process.env.SMTP_USER}>`,
    to: process.env.RECEIVER_EMAIL || process.env.SMTP_USER,
    subject: `New Booking Request for ${space} at ${location}`,
    text: `
      Booking Request:
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Space Type: ${space}
      Location: ${location}
      Duration: ${duration}
      Start Date: ${startDate}
      Additional Note: ${message || 'None'}
    `,
    html: `
      <h2>New Booking Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Space Type:</strong> ${space}</p>
      <p><strong>Location:</strong> ${location}</p>
      <p><strong>Duration:</strong> ${duration}</p>
      <p><strong>Start Date:</strong> ${startDate}</p>
      <p><strong>Additional Note:</strong> ${message || 'None'}</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Booking email sent: %s', info.messageId);
    res.status(200).json({ success: true, message: 'Booking request sent successfully!' });
  } catch (error) {
    console.error('Error sending booking email:', error);
    res.status(500).json({ success: false, message: 'Failed to send booking request.' });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
