// lib/nodemailer.ts
import nodemailer from 'nodemailer';

function createTransporter() {
  // Use Gmail for development
  if (process.env.NODE_ENV === 'development') {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
  }

  // Use professional email for production
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    // Optional: Add better error handling for production
    tls: {
      rejectUnauthorized: false // For self-signed certificates
    }
  });
}

export const transporter = createTransporter();