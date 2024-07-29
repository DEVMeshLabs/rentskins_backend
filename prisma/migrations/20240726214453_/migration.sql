/*
  Warnings:

  - You are about to drop the column `borderColor` on the `Skin` table. All the data in the column will be lost.
  - You are about to drop the column `color` on the `Skin` table. All the data in the column will be lost.
  - You are about to drop the column `stickers` on the `Skin` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Skin" DROP COLUMN "borderColor",
DROP COLUMN "color",
DROP COLUMN "stickers",
ADD COLUMN     "skin_border_color" VARCHAR(255),
ADD COLUMN     "skin_color" VARCHAR(255),
ADD COLUMN     "skin_stickers" JSONB,
ADD COLUMN     "skin_wear" VARCHAR(255);
