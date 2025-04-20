// utils/otpStore.js
const otpMemoryStore = new Map();

// Store OTP with timestamp
export const setOtp = (email, otp) => {
  otpMemoryStore.set(email, { otp, timestamp: Date.now() });
};

// Retrieve OTP data
export const getOtp = (email) => {
  return otpMemoryStore.get(email);
};

// Remove OTP entry (fix: typo 'emai' → 'email')
export const removeOtp = (email) => {
  otpMemoryStore.delete(email);
};

// Check if OTP has expired
export const isOtpExpired = (email, expiryMinutes = 5) => {
  const data = otpMemoryStore.get(email);
  if (!data) return true;

  const { timestamp } = data;
  const now = Date.now();
  const diffMinutes = (now - timestamp) / (1000 * 60);

  return diffMinutes > expiryMinutes;
};
