/*
  Warnings:

  - The `sale_type` column on the `Skin` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Skin" DROP COLUMN "sale_type",
ADD COLUMN     "sale_type" VARCHAR(255)[];
