import { connect } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import crypto from "crypto";
import { sendEmail } from "@/helpers/mailer";

connect();

//forgot password route

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        {
          message: "If an account exists, a password reset link has been sent.",
        },
        { status: 200 },
      );
    }

    const token = crypto.randomBytes(32).toString("hex");
    user.forgotPasswordToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");
    user.forgotPasswordTokenExpiry = new Date(Date.now() + 3600000);
    await user.save();

    const mailResponse = await sendEmail({
      email,
      emailType: "RESET",
      userId: user._id,
      token: token,
    });
    return NextResponse.json({
      message: "Password reset email sent",
      mailResponse,
      success: true,
    });
    
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
