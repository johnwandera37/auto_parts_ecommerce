/*
  Warnings:

  - A unique constraint covering the columns `[googleId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[googleEmail]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `googleEmail` VARCHAR(191) NULL,
    ADD COLUMN `googleId` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_googleId_key` ON `User`(`googleId`);

-- CreateIndex
CREATE UNIQUE INDEX `User_googleEmail_key` ON `User`(`googleEmail`);
