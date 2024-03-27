/*
  Warnings:

  - You are about to drop the column `fee` on the `RentalTransaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "RentalTransaction" DROP COLUMN "fee",
ADD COLUMN     "remainder" DOUBLE PRECISION;
