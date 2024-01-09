/*
  Warnings:

  - Added the required column `days_quantity` to the `RentalTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RentalTransaction" ADD COLUMN     "days_quantity" INTEGER NOT NULL;
