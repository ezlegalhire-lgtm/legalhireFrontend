import { NextRequest, NextResponse } from "next/server";
import { verifyOTP } from "@/lib/otpStore";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, otp } = body;

    if (!email || !otp) {
      return NextResponse.json(
        { success: false, error: "Email and OTP are required" },
        { status: 400 }
      );
    }

    // Validate OTP format (6 digits)
    if (!/^\d{6}$/.test(otp)) {
      return NextResponse.json(
        { success: false, error: "Invalid OTP format. Please enter 6 digits." },
        { status: 400 }
      );
    }

    const result = verifyOTP(email, otp);

    if (!result.valid) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error("OTP verify error:", error);
    return NextResponse.json(
      { success: false, error: "An error occurred while verifying the code" },
      { status: 500 }
    );
  }
}
