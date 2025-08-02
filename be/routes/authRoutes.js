const express = require('express');
const router = express.Router();
const { signup, login,sendEmailOTP,verifyEmailOTP } = require('../controllers/authController');
router.post('/signup', signup);
router.post('/login', login);
router.post('/send-email-otp', sendEmailOTP);
router.post('/verify-email-otp', verifyEmailOTP);


module.exports = router;
