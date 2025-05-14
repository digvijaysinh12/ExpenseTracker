const otpMemoryStore = new Map();

export const setOtp = (email, otp) => {
  otpMemoryStore.set(email, { otp, timestamp: Date.now() });
};

export const getOtp = (email) => {
  return otpMemoryStore.get(email);
};

export const removeOtp = (email) => {
  otpMemoryStore.delete(email);
};

export const isOtpExpired = (email, expiryMinutes = 5) => {
  const data = otpMemoryStore.get(email);
  if (!data) return true;
  const diffMinutes = (Date.now() - data.timestamp) / (1000 * 60);
  return diffMinutes > expiryMinutes;
};
