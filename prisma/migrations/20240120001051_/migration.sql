/*
  Warnings:

  - You are about to drop the column `comission_rent` on the `RentalTransaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "RentalTransaction" DROP COLUMN "comission_rent",
ADD COLUMN     "commission_rent" DOUBLE PRECISION;
