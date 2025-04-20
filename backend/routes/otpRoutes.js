import express from "express";
import otpController from '../controllers/otpController.js';
const router = express.Router();
router.post('/send-otp',otpController.sendOTP);

export default router;