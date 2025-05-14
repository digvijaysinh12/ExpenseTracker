import { setOtp } from '../utils/otpStore.js';
import mailSender from '../utils/mailSender.js';
import User from '../models/userModel.js';

const sendOTP = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setOtp(email, otp);

    const subject = "OTP Verification Code";
    const body = `<h2>Hello!</h2><p>Your OTP is:</p><h1>${otp}</h1><p>This OTP will expire in 5 minutes.</p>`;
    await mailSender(email, subject, body);

    return res.status(200).json({
      success: true,
      message: "OTP Sent Successfully",
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
};

export default { sendOTP };
