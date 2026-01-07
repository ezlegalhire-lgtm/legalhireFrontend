"use client";

import { Mail, X, RefreshCw, CheckCircle, AlertCircle } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface OTPVerificationModalProps {
  isOpen: boolean;
  email: string;
  name?: string;
  onClose: () => void;
  onVerified: () => void;
}

export default function OTPVerificationModal({
  isOpen,
  email,
  name,
  onClose,
  onVerified,
}: OTPVerificationModalProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [otpSent, setOtpSent] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setOtp(["", "", "", "", "", ""]);
      setError(null);
      setSuccess(false);
      setOtpSent(false);
      setCountdown(0);
    }
  }, [isOpen]);

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Auto-focus first input when OTP is sent
  useEffect(() => {
    if (otpSent && inputRefs.current[0]) {
      inputRefs.current[0]?.focus();
    }
  }, [otpSent]);

  const sendOTP = async () => {
    setIsSending(true);
    setError(null);

    try {
      const response = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send verification code");
      }

      setOtpSent(true);
      setCountdown(60); // 60 seconds before resend
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send verification code");
    } finally {
      setIsSending(false);
    }
  };

  const handleInputChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError(null);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all digits are entered
    if (value && index === 5 && newOtp.every(d => d)) {
      verifyOTP(newOtp.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pastedData.length === 6) {
      const newOtp = pastedData.split("");
      setOtp(newOtp);
      verifyOTP(pastedData);
    }
  };

  const verifyOTP = async (otpValue: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otpValue }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Invalid verification code");
      }

      setSuccess(true);
      setTimeout(() => {
        onVerified();
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed");
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-violet-600 px-6 py-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Verify Your Email
          </h2>
          <p className="text-purple-100 text-sm">
            {otpSent
              ? `We've sent a 6-digit code to ${email}`
              : `We'll send a verification code to ${email}`
            }
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {success ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Email Verified!
              </h3>
              <p className="text-slate-600">
                Proceeding to booking confirmation...
              </p>
            </div>
          ) : !otpSent ? (
            // Send OTP screen
            <div className="text-center">
              <p className="text-slate-600 mb-6">
                To proceed with your booking, we need to verify your email address.
                Click the button below to receive a verification code.
              </p>

              <button
                onClick={sendOTP}
                disabled={isSending}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-violet-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSending ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="w-5 h-5" />
                    Send Verification Code
                  </>
                )}
              </button>

              {error && (
                <div className="mt-4 flex items-center gap-2 text-red-600 text-sm justify-center">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}
            </div>
          ) : (
            // Verify OTP screen
            <div>
              <p className="text-center text-slate-600 mb-6">
                Enter the 6-digit code we sent to your email
              </p>

              {/* OTP Input */}
              <div className="flex justify-center gap-2 mb-6" onPaste={handlePaste}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {inputRefs.current[index] = el}}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    disabled={isLoading || success}
                    className={`w-12 h-14 text-center text-xl font-bold border-2 rounded-xl outline-none transition-all
                      ${error
                        ? "border-red-300 bg-red-50"
                        : digit
                          ? "border-purple-500 bg-purple-50"
                          : "border-slate-200"
                      }
                      focus:border-purple-600 focus:ring-2 focus:ring-purple-500/20
                      disabled:bg-slate-100 disabled:cursor-not-allowed
                    `}
                  />
                ))}
              </div>

              {/* Error message */}
              {error && (
                <div className="mb-4 flex items-center gap-2 text-red-600 text-sm justify-center">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}

              {/* Verify button */}
              <button
                onClick={() => verifyOTP(otp.join(""))}
                disabled={otp.some(d => !d) || isLoading}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-violet-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify Code"
                )}
              </button>

              {/* Resend button */}
              <div className="text-center mt-4">
                {countdown > 0 ? (
                  <p className="text-slate-500 text-sm">
                    Resend code in {countdown}s
                  </p>
                ) : (
                  <button
                    onClick={sendOTP}
                    disabled={isSending}
                    className="text-purple-600 hover:text-purple-700 text-sm font-medium inline-flex items-center gap-1"
                  >
                    <RefreshCw className={`w-4 h-4 ${isSending ? 'animate-spin' : ''}`} />
                    {isSending ? "Sending..." : "Resend Code"}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200">
          <p className="text-xs text-slate-500 text-center">
            By verifying your email, you confirm that you have access to this email address
            and agree to receive booking confirmations.
          </p>
        </div>
      </div>
    </div>
  );
}
