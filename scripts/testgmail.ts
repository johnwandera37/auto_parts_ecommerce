// scripts/testgmail.ts
import nodemailer from 'nodemailer';
import { loadEnvConfig } from '@next/env';

// Load environment variables like Next.js does
const projectDir = process.cwd();
loadEnvConfig(projectDir);

async function testGmail() {
  console.log('Testing Gmail credentials...');
  console.log('EMAIL_FROM:', process.env.EMAIL_FROM);
  console.log('GMAIL_APP_PASSWORD exists:', !!process.env.GMAIL_APP_PASSWORD);
  console.log('GMAIL_APP_PASSWORD length:', process.env.GMAIL_APP_PASSWORD?.length);

  if (!process.env.EMAIL_FROM || !process.env.GMAIL_APP_PASSWORD) {
    console.error('❌ Missing environment variables');
    return false;
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  try {
    await transporter.verify();
    console.log('✅ SMTP connection successful');
    return true;
  } catch (error: any) {
    console.error('❌ SMTP connection failed:', error.message);
    return false;
  }
}

testGmail().then(success => {
  process.exit(success ? 0 : 1);
});