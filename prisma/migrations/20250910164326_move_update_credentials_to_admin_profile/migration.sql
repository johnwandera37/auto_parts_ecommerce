/*
  Warnings:

  - You are about to drop the column `hasUpdatedCredentials` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `adminprofile` ADD COLUMN `hasUpdatedCredentials` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `hasUpdatedCredentials`;
