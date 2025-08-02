const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // or use SMTP config
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOTPEmail = async (toEmail, otp) => {
  const mailOptions = {
    from: `"CivicTrack" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Your CivicTrack OTP Code",
    html: `<h2>OTP Verification</h2><p>Your OTP is: <strong>${otp}</strong></p>`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendOTPEmail;
