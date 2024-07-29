/*
  Warnings:

  - You are about to drop the column `totalGuarantee` on the `RentalTransaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "RentalTransaction" DROP COLUMN "totalGuarantee",
ADD COLUMN     "totalPriceSkins" DOUBLE PRECISION;
