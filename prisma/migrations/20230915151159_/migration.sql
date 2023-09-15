/*
  Warnings:

  - You are about to drop the column `bol_buyer` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `bol_seller` on the `Transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "bol_buyer",
DROP COLUMN "bol_seller",
ADD COLUMN     "confirm_buyer" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "confirm_seller" BOOLEAN NOT NULL DEFAULT false;
