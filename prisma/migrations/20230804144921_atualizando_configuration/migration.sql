/*
  Warnings:

  - Added the required column `owner_phone` to the `Configuration` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Configuration" ADD COLUMN     "owner_phone" VARCHAR(255) NOT NULL;
