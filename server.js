const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname)));

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT, 10) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

app.post('/send-email', async (req, res) => {
  try {
    const { type, name, email, message } = req.body;
    let subject;
    let text;
    if (type === 'newsletter') {
      subject = 'New Newsletter Subscription';
      text = `New subscriber: ${email}`;
    } else {
      subject = 'New Contact Form Message';
      text = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
    }

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.RECIPIENT_EMAIL,
      subject,
      text
    });
    res.json({ success: true });
  } catch (err) {
    console.error('Error sending email', err);
    res.status(500).json({ success: false });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
