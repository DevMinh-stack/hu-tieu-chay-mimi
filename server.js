const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.json()); // Parse JSON requests
app.use(express.static('public')); // Serve your HTML file from a "public" folder

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nguyenduyminh1010@gmail.com', // Replace with your Gmail
        pass: 'keec bonx gxfc dwbh'     // Replace with your App Password (see below)
    }
});

// Endpoint to handle order submission
app.post('/send-order', (req, res) => {
    const { customerName, phone, address, cartItems, total } = req.body;

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: 'nguyenduyminh1010@gmail.com',
        subject: 'Đơn hàng từ Quán Chay Minh Nhi',
        text: `Thông tin đặt hàng:\nHọ và tên: ${customerName}\nSố điện thoại: ${phone}\nĐịa chỉ: ${address}\nDanh sách món: ${cartItems}\nTổng tiền: ${total}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).send('Error sending email');
        }
        res.status(200).send('Email sent successfully');
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});