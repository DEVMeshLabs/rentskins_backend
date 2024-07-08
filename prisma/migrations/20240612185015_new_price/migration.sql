/*
  Warnings:

  - The `pricesafe7d` column on the `Skin` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Skin" DROP COLUMN "pricesafe7d",
ADD COLUMN     "pricesafe7d" DOUBLE PRECISION;
