import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { generateOTP, storeOTP, getOTPData } from "@/lib/otpStore";

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.RESEND_EMAIL_ADDRESS || "noreply@onlinelegaluae.com";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Check if there's an existing OTP that hasn't expired and was sent recently (rate limiting)
    const existingOtp = getOTPData(email);
    if (existingOtp && existingOtp.expiresAt > Date.now()) {
      const timeLeft = Math.ceil((existingOtp.expiresAt - Date.now()) / 1000);
      if (timeLeft > 240) { // If more than 4 minutes left (sent less than 1 min ago)
        return NextResponse.json(
          {
            success: false,
            error: "Please wait before requesting a new OTP",
            retryAfter: 60 - (300 - timeLeft)
          },
          { status: 429 }
        );
      }
    }

    // Generate new OTP
    const otp = generateOTP();

    // Store OTP
    storeOTP(email, otp);

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: `EZ Legal Hire <${fromEmail}>`,
      to: [email],
      subject: "Your Verification Code - EZ Legal Hire",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <div style="background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
              <!-- Header -->
              <div style="background: linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%); padding: 30px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: bold;">EZ Legal Hire</h1>
                <p style="color: #e9d5ff; margin: 10px 0 0; font-size: 14px;">Email Verification</p>
              </div>

              <!-- Content -->
              <div style="padding: 40px 30px;">
                <p style="color: #334155; font-size: 16px; margin: 0 0 20px;">
                  Hello${name ? ` ${name}` : ''},
                </p>
                <p style="color: #64748b; font-size: 14px; margin: 0 0 30px; line-height: 1.6;">
                  Please use the following verification code to complete your booking. This code will expire in 5 minutes.
                </p>

                <!-- OTP Box -->
                <div style="background-color: #f1f5f9; border-radius: 12px; padding: 25px; text-align: center; margin: 0 0 30px;">
                  <p style="color: #64748b; font-size: 12px; margin: 0 0 10px; text-transform: uppercase; letter-spacing: 1px;">Your Verification Code</p>
                  <div style="font-size: 36px; font-weight: bold; color: #7c3aed; letter-spacing: 8px; font-family: monospace;">
                    ${otp}
                  </div>
                </div>

                <p style="color: #94a3b8; font-size: 13px; margin: 0; line-height: 1.6;">
                  If you didn't request this code, you can safely ignore this email. Someone may have entered your email address by mistake.
                </p>
              </div>

              <!-- Footer -->
              <div style="background-color: #f8fafc; padding: 20px 30px; border-top: 1px solid #e2e8f0;">
                <p style="color: #94a3b8; font-size: 12px; margin: 0; text-align: center;">
                  This is an automated message from EZ Legal Hire. Please do not reply to this email.
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { success: false, error: "Failed to send verification email" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Verification code sent successfully",
      expiresIn: 300, // 5 minutes in seconds
    });
  } catch (error) {
    console.error("OTP send error:", error);
    return NextResponse.json(
      { success: false, error: "An error occurred while sending the verification code" },
      { status: 500 }
    );
  }
}
