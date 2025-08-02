    const bcrypt = require('bcrypt');
    const jwt = require('jsonwebtoken');
    const User = require("../models/User");

    require('dotenv').config();

    const sendOTPEmail = require("../utils/sendEmailOTP");
    const emailOtpStore = {}; // Use DB or Redis for production

    const sendEmailOTP = async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const otp = Math.floor(100000 + Math.random() * 900000);
    emailOtpStore[email] = otp;

    try {
        await sendOTPEmail(email, otp);
        res.status(200).json({ message: "OTP sent to email" });
    } catch (err) {
        res.status(500).json({ message: "Failed to send OTP", error: err.message });
    }
    };
    const verifyEmailOTP = (req, res) => {
    const { email, otp } = req.body;
    if (Number(emailOtpStore[email]) === Number(otp)) {
        delete emailOtpStore[email];
        return res.status(200).json({ message: "OTP verified" });
    }
    return res.status(400).json({ message: "Invalid or expired OTP" });
    };

    // Signup controller
    const signup = async (req, res) => {
    try {
        const { username, email, phone, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
        username,
        email,
        phone,
        password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Server error during signup' });
    }
    };

    //login controller
    const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
        );
        res
        .cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 1000 * 60 * 60 * 2, // 2 hours
        })
        .status(200)
        .json({ message: 'Login successful' });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
    };

    module.exports = { signup, login,sendEmailOTP,verifyEmailOTP};
