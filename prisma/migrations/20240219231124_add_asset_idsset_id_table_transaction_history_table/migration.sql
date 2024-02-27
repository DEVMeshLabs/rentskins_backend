/*
  Warnings:

  - Added the required column `asset_id` to the `TransactionHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TransactionHistory" ADD COLUMN     "asset_id" VARCHAR(255) NOT NULL;
