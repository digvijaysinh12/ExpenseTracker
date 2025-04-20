import mongoose from 'mongoose';
import mailSender from '../utils/mailSender.js'; // Default import is now valid

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5, // expires in 5 minutes
  },
});

// Function to send OTP via email
async function sendVerificationEmail(email, otp) {
  try {
    const subject = "OTP Verification Code";
    const body = `
      <h2>Hello!</h2>
      <p>Your OTP is:</p>
      <h1 style="letter-spacing: 4px;">${otp}</h1>
      <p>This OTP will expire in 5 minutes.</p>
    `;

    await mailSender(email, subject, body);
  } catch (error) {
    console.error("Error occurred while sending email:", error);
    throw error;
  }
}

// Pre-save hook
otpSchema.pre("save", async function (next) {
  console.log("New OTP document will be saved");
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
  }
  next();
});

const OTP = mongoose.model("OTP", otpSchema);
export default OTP;
