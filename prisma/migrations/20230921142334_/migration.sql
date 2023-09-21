/*
  Warnings:

  - Added the required column `median_price` to the `Skin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Skin" ADD COLUMN     "median_price" DOUBLE PRECISION NOT NULL;
