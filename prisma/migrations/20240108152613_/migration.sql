/*
  Warnings:

  - You are about to alter the column `days_quantity` on the `RentalTransaction` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `VarChar(5)`.

*/
-- AlterTable
ALTER TABLE "RentalTransaction" ALTER COLUMN "days_quantity" SET DATA TYPE VARCHAR(5);
