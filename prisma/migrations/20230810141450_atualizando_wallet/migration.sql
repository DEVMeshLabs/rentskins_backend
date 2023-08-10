/*
  Warnings:

  - The `value` column on the `Wallet` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Wallet" DROP COLUMN "value",
ADD COLUMN     "value" DOUBLE PRECISION NOT NULL DEFAULT 0;
