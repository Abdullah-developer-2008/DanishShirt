require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Set up the Email Transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS // Use an "App Password" from Google
    }
});

app.post('/send-order', (req, res) => {
    const { product, qty, price, color, instructions, email, phone, img } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'abdullah7qow@gmail.com',
        subject: `New Bulk Order: ${product}`,
        html: `
            <div style="font-family: Arial; border: 1px solid #ddd; padding: 20px;">
                <h2 style="color: #4A607D;">New Order Received</h2>
                <img src="${img}" style="width: 200px; border-radius: 8px;">
                <p><strong>Product:</strong> ${product}</p>
                <p><strong>Quantity:</strong> ${qty}</p>
                <p><strong>Total Price:</strong> ${price}</p>
                <p><strong>Color:</strong> ${color}</p>
                <p><strong>Instructions:</strong> ${instructions || 'None'}</p>
                <hr>
                <h3 style="color: #C5A059;">Customer Contact</h3>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
            </div>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).json({ message: 'Order Confirmed!' });
    });
});


const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() }); // Keep image in memory for email

// Add this to your server.js
app.post('/custom-design', upload.single('designFile'), (req, res) => {
    const { userName, email, phone, colorStyle, description } = req.body;
    const file = req.file;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'abdullah7qow@gmail.com',
        subject: `🎨 CUSTOM DESIGN: ${userName}`,
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; border: 1px solid #C5A059; padding: 20px;">
                <h2 style="color: #4A607D; border-bottom: 2px solid #C5A059; padding-bottom: 10px;">New Customization Inquiry</h2>
                <p><strong>Customer Name:</strong> ${userName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Color Style:</strong> ${colorStyle}</p>
                <p><strong>Description:</strong> ${description}</p>
                <br>
                <p style="font-size: 0.8rem; color: #777;">The reference image is attached to this email.</p>
            </div>
        `,
        attachments: [
            {
                filename: file.originalname,
                content: file.buffer
            }
        ]
    };

    transporter.sendMail(mailOptions, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Email failed");
        }
        res.status(200).send("Success");
    });
});

// Add this route to your server.js
app.post('/bulk-order', (req, res) => {
    const { clientName, companyName, email, phone, quantity, message } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'abdullah7qow@gmail.com',
        subject: `🏢 BULK INQUIRY: ${companyName || clientName}`,
        html: `
            <div style="font-family: 'Segoe UI', sans-serif; border: 2px solid #4A607D; padding: 25px;">
                <h2 style="color: #4A607D; margin-top: 0;">New Bulk Manufacturing Inquiry</h2>
                <p><strong>Client:</strong> ${clientName}</p>
                <p><strong>Company:</strong> ${companyName || 'Not Specified'}</p>
                <p><strong>Quantity Range:</strong> ${quantity}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <div style="background: #f4f4f4; padding: 15px; border-radius: 5px; margin-top: 15px;">
                    <strong>Message/Requirements:</strong><br>
                    ${message}
                </div>
            </div>
        `
    };

    transporter.sendMail(mailOptions, (err) => {
        if (err) return res.status(500).send("Error sending email");
        res.status(200).send("Success");
    });
});
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;