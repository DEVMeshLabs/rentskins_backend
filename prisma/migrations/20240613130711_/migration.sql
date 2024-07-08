/*
  Warnings:

  - You are about to drop the column `borderColoer` on the `Skin` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Skin" DROP COLUMN "borderColoer",
ADD COLUMN     "borderColor" VARCHAR(255);
