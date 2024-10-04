/*
  Warnings:

  - Added the required column `skin_price` to the `GuaranteeSkin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GuaranteeSkin" ADD COLUMN     "addedToBackpackAt" TIMESTAMP(3),
ADD COLUMN     "skin_price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "withdrawAfter" TIMESTAMP(3);
