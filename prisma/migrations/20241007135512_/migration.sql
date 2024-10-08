/*
  Warnings:

  - You are about to drop the column `wallet_user` on the `WithdrawalRequest` table. All the data in the column will be lost.
  - Added the required column `walletAmount` to the `WithdrawalRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WithdrawalRequest" DROP COLUMN "wallet_user",
ADD COLUMN     "walletAmount" DOUBLE PRECISION NOT NULL;
