import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId, token }: any) => {
  try {
    let tokenForLink: string;

    if (emailType === "VERIFY") {
      const hashedToken = await bcrypt.hash(userId.toString(), 10);

      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });

      tokenForLink = hashedToken;
    } else if (emailType === "RESET") {
      if (!token) {
        throw new Error("Reset token is missing");
      }

      // The reset token is already hashed and saved in the database
      // by the forgot-password route.
      // We only need the original token for the email link.
      tokenForLink = token;
    } else {
      throw new Error("Invalid email type");
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
    });

    const link =
      emailType === "VERIFY"
        ? `${process.env.DOMAIN}/verifyemail?token=${tokenForLink}`
        : `${process.env.DOMAIN}/resetpassword?token=${tokenForLink}`;

    const mailOptions = {
      from: "dhimanprikshit@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${link}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      } or copy and paste the link below in your browser.<br>${link}</p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
