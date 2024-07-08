/*
  Warnings:

  - Made the column `pricesafe7d` on table `Skin` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Skin" ALTER COLUMN "pricesafe7d" SET NOT NULL;
