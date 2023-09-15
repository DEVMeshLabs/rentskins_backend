/*
  Warnings:

  - You are about to drop the column `confirm_buyer` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `confirm_seller` on the `Transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "confirm_buyer",
DROP COLUMN "confirm_seller",
ADD COLUMN     "buyer_confirm" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "seller_confirm" BOOLEAN NOT NULL DEFAULT false;
