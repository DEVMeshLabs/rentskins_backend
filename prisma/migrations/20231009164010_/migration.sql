/*
  Warnings:

  - You are about to drop the column `skin_color` on the `Skin` table. All the data in the column will be lost.
  - Added the required column `skin_rarity` to the `Skin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Skin" DROP COLUMN "skin_color",
ADD COLUMN     "skin_rarity" VARCHAR(255) NOT NULL;
