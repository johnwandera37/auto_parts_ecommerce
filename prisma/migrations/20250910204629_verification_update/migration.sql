/*
  Warnings:

  - You are about to drop the column `token` on the `verification` table. All the data in the column will be lost.
  - You are about to drop the column `verified` on the `verification` table. All the data in the column will be lost.
  - Added the required column `otp` to the `Verification` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Verification_token_key` ON `verification`;

-- AlterTable
ALTER TABLE `verification` DROP COLUMN `token`,
    DROP COLUMN `verified`,
    ADD COLUMN `attempts` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `emailVerified` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `otp` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE INDEX `Verification_otp_idx` ON `Verification`(`otp`);
