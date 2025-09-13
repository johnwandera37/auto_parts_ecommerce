// lib/email.ts
import { errLog, log } from "@/utils/logger";
import { transporter } from "./nodemailer";

interface CustomEmailErrorObj {
  customErrMsg: string;
  code: string;
  status: number;
  shouldRethrow?: boolean;
}

export async function sendVerificationEmail(
  email: string,
  otp: string,
  context: "reset" | "verify" = "verify"
): Promise<void> {
  const mailOptions = {
    from: process.env.EMAIL_FROM, // ✅ Use EMAIL_FROM for better practice
    to: email,
    subject:
      context === "verify"
        ? "Verify Your Email Address"
        : "Password Reset Verification Code",
    html: `
      <h2>${
        context === "verify" ? "Email Verification" : "Password Reset Request"
      }</h2>
      <p>Your verification code is: <strong>${otp}</strong></p>
      <p>This code will expire in 15 minutes.</p>
      <p>If you didn't request this, please ignore this email.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    log(
      `📧 ${
        context === "verify" ? "Verification" : "Password reset"
      } email sent to:`,
      email
    );
  } catch (error: any) {
    errLog(
      `📧 Failed to send ${
        context === "verify" ? "verification" : "reset password"
      } email`,
      error
    );

    const emailError: CustomEmailErrorObj = {
      customErrMsg: `Failed to send ${
        context === "verify" ? "verification" : "reset password"
      } email`,
      code: error.code || "UNKNOWN",
      status: 500,
    };

    // Network errors - should be shown to user
    if (error.code === "EDNS" || error.code === "ENOTFOUND") {
      emailError.customErrMsg =
        "Network issues, check your connection and try again";
      emailError.code = error.code;
      emailError.status = 503;
      emailError.shouldRethrow = true;
    }
    // Connection errors - should be shown to user
    else if (error.code === "ECONNECTION") {
      emailError.customErrMsg = "Cannot connect to email server";
      emailError.code = error.code;
      emailError.status = 503;
      emailError.shouldRethrow = true;
    }
    // Authentication errors - should be logged but not shown to user
    else if (error.code === "EAUTH") {
      emailError.customErrMsg = "Email service configuration error";
      emailError.code = error.code;
      // Don't rethrow - treat as success for security
    }

    // Timeout errors - network related
    else if (error.code === "ETIMEDOUT") {
      emailError.customErrMsg = "Connection timeout: Please try again later.";
      emailError.code = error.code;
      emailError.status = 503;
      emailError.shouldRethrow = true;
    }

    // Only rethrow errors that should be shown to users
    if (emailError.shouldRethrow) {
      throw emailError;
    }

    // For other errors, just log and continue (security)
    errLog("Email error (not rethrown for security):", emailError);
  }
}

//  else if (error.code === "ECONNECTION") {
//     errLog("Cannot connect to email server");
//   }
