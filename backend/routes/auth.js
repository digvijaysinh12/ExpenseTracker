import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";


dotenv.config();

const router = express.Router();
let otpStore = {}; // Temporary storage for OTPs

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
    },
});

// Register Route
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = Date.now() + 5 * 60 * 1000; // OTP expiry time set to 5 minutes from now
    otpStore[email] = { otp, expiry: otpExpiry }; // Store OTP and expiry time

    // Send OTP email
    await transporter.sendMail({
      from: '"Digvijaysinh" <digvijaysinh8622@gmail.com>',
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
    });

    res.status(200).json({ message: "OTP sent to your email. Please verify." });
  } catch (err) {
    console.error("Error sending OTP:", err);
    res.status(500).json({ message: "Error sending OTP. Please try again." });
  }
});

// Verify OTP Route
router.post("/verify-otp", async (req, res) => {
  const { email, otp, username, password } = req.body;

  if (otpStore[email]) {
    const { otp: storedOtp, expiry } = otpStore[email];

    // Check if OTP has expired
    if (Date.now() > expiry) {
      delete otpStore[email]; // OTP expired, remove from store
      return res.status(400).json({ message: "OTP has expired. Please request a new OTP." });
    }

    // Verify the OTP
    if (storedOtp === otp) {
      // Hash password and save user
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, email, password: hashedPassword });
      await user.save();

      // Remove OTP from store
      delete otpStore[email];

      res.status(201).json({ message: "User registered successfully" });
    } else {
      res.status(400).json({ message: "Invalid OTP" });
    }
  } else {
    res.status(400).json({ message: "OTP not found. Please request a new one." });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({
      success: true,
      token,
      message: "Login Successful",
    });
  } catch (err) {
    res.status(500).json({ message: "Server error, please try again later." });
  }
});

// Logout Route (optional)
router.post("/logout", (req, res) => {
  res.json({ message: "Logged out successfully" });
});



export default router;
