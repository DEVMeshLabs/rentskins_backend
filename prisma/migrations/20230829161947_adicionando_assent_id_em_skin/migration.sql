/*
  Warnings:

  - Added the required column `assent_id` to the `Skin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Skin" ADD COLUMN     "assent_id" VARCHAR(255) NOT NULL;
