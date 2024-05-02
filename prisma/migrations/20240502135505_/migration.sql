/*
  Warnings:

  - You are about to drop the column `paintseed` on the `Skin` table. All the data in the column will be lost.
  - Added the required column `skin_paintseed` to the `Skin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Skin" DROP COLUMN "paintseed",
ADD COLUMN     "skin_paintseed" VARCHAR(255) NOT NULL;
