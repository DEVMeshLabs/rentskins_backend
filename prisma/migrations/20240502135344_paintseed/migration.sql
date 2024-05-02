/*
  Warnings:

  - Added the required column `paintseed` to the `Skin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Skin" ADD COLUMN     "paintseed" VARCHAR(255) NOT NULL;
