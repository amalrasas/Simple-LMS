/*
  Warnings:

  - Added the required column `index` to the `Module` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Module` ADD COLUMN `index` INTEGER NOT NULL;
