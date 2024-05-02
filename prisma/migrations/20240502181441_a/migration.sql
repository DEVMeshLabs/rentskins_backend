/*
  Warnings:

  - Changed the type of `skin_paintseed` on the `Skin` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Skin" DROP COLUMN "skin_paintseed",
ADD COLUMN     "skin_paintseed" DOUBLE PRECISION NOT NULL;
