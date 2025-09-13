// utils/otp.ts
import prisma from "@/lib/db";
import { errLog, log } from "./logger";

export function generateOTP(): string {
  // 6-digit OTP
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function createOrUpdateVerification(userId: string) {
  let otp: string;
  let attempts = 0;
  
  // Generate unique OTP (retry if collision occurs - very rare)
  do {
    otp = generateOTP();
    attempts++;
    
    // Check if OTP already exists (very unlikely but safe)
    const existing = await prisma.verification.findFirst({
      where: { otp, expiresAt: { gt: new Date() } }
    });
    
    if (!existing) break;
    
    // Safety check to prevent infinite loop
    if (attempts > 10) {
      throw new Error('Failed to generate unique OTP');
    }
  } while (true);

  const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

  return prisma.verification.upsert({
    where: { userId },
    update: { 
      otp, 
      expiresAt,
      attempts: 0, // Reset attempts on new OTP
    },
    create: {
      userId,
      otp,
      expiresAt,
      attempts: 0
    }
  });
}

export async function verifyOTP(userId: string, userOtp: string): Promise<boolean> {
  const verification = await prisma.verification.findUnique({
    where: { userId }
  });

  if (!verification) {
    throw new Error('No verification record found');
  }

  if (verification.expiresAt < new Date()) {
    log("OTP has expired");
    throw new Error('Verification code has expired');
  }

  if (verification.attempts >= 3) {
    throw new Error('Too many failed attempts. Please request a new code.');
  }

  if (verification.otp !== userOtp) {
    // Increment attempt count
    await prisma.verification.update({
      where: { userId },
      data: { attempts: { increment: 1 } }
    });
    log("Invalid OTP")
    throw new Error('The OTP provided is invalid');
  }

 // OTP is valid - mark user as verified and CLEAN UP verification data
await prisma.$transaction([
  prisma.user.update({
    where: { id: userId },
    data: { emailVerified: true } // Permanent status on User
  }),
  prisma.verification.delete({
    where: { userId } // Temporary data removed
  })
]);

  return true;
}