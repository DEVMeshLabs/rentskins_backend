/*
  Warnings:

  - You are about to alter the column `skin_media_price_steam` on the `Skin` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "Skin" ALTER COLUMN "skin_media_price_steam" SET DATA TYPE VARCHAR(255);
