// In-memory OTP store
// In production, consider using Redis or database for persistence across serverless invocations

interface OTPData {
  otp: string;
  expiresAt: number;
  attempts: number;
}

// Using a global variable to persist across API route calls in development
declare global {
  var otpStore: Map<string, OTPData> | undefined;
}

export const otpStore: Map<string, OTPData> = global.otpStore || new Map();

if (process.env.NODE_ENV !== "production") {
  global.otpStore = otpStore;
}

// Clean up expired OTPs
export function cleanupExpiredOTPs(): void {
  const now = Date.now();
  const entries = Array.from(otpStore.entries());
  entries.forEach(([email, data]) => {
    if (data.expiresAt < now) {
      otpStore.delete(email);
    }
  });
}

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function storeOTP(email: string, otp: string): void {
  cleanupExpiredOTPs();
  otpStore.set(email.toLowerCase(), {
    otp,
    expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
    attempts: 0,
  });
}

export function verifyOTP(email: string, otp: string): { valid: boolean; error?: string } {
  cleanupExpiredOTPs();
  const data = otpStore.get(email.toLowerCase());

  if (!data) {
    return { valid: false, error: "No verification code found. Please request a new one." };
  }

  if (data.expiresAt < Date.now()) {
    otpStore.delete(email.toLowerCase());
    return { valid: false, error: "Verification code has expired. Please request a new one." };
  }

  if (data.attempts >= 5) {
    otpStore.delete(email.toLowerCase());
    return { valid: false, error: "Too many failed attempts. Please request a new code." };
  }

  if (data.otp !== otp) {
    data.attempts += 1;
    return { valid: false, error: `Invalid code. ${5 - data.attempts} attempts remaining.` };
  }

  // OTP is valid - remove it so it can't be reused
  otpStore.delete(email.toLowerCase());
  return { valid: true };
}

export function getOTPData(email: string): OTPData | undefined {
  return otpStore.get(email.toLowerCase());
}
