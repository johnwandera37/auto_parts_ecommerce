// lib/email.ts
import { errLog, log } from '@/utils/logger';
import { transporter } from './nodemailer';

export async function sendVerificationEmail(email: string, otp: string) {
  const mailOptions = {
    from: process.env.EMAIL_FROM, // ✅ Use EMAIL_FROM for better practice
    to: email,
    subject: 'Verify Your Email Address',
    html: `
      <h2>Email Verification</h2>
      <p>Your verification code is: <strong>${otp}</strong></p>
      <p>This code will expire in 15 minutes.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    log('📧 Verification email sent to:', email);
  } catch (error) {
    errLog('📧 Error sending email:', error);
    throw new Error('Failed to send verification email');
  }
}