/*
  Warnings:

  - Added the required column `amountTotal` to the `WithdrawalRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WithdrawalRequest" ADD COLUMN     "amountTotal" DOUBLE PRECISION NOT NULL;
