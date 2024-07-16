/*
  Warnings:

  - You are about to drop the column `feePrice` on the `RentalTransaction` table. All the data in the column will be lost.
  - You are about to drop the column `remainder` on the `RentalTransaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "RentalTransaction" DROP COLUMN "feePrice",
DROP COLUMN "remainder",
ADD COLUMN     "fee" DOUBLE PRECISION;
