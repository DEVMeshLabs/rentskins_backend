/*
  Warnings:

  - You are about to drop the column `walletAmount` on the `WithdrawalRequest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WithdrawalRequest" DROP COLUMN "walletAmount";
