/*
  Warnings:

  - You are about to drop the `Token` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Token` DROP FOREIGN KEY `Token_userId_fkey`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `hashedRt` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `Token`;
