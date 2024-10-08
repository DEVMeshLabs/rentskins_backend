/*
  Warnings:

  - Added the required column `wallet_user` to the `WithdrawalRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WithdrawalRequest" ADD COLUMN     "wallet_user" DOUBLE PRECISION NOT NULL;
