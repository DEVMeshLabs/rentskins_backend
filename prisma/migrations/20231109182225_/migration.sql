/*
  Warnings:

  - The `stickers` column on the `Skin` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Skin" DROP COLUMN "stickers",
ADD COLUMN     "stickers" JSONB;
