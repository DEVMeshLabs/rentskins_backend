/*
  Warnings:

  - You are about to drop the column `buyer_id` on the `Skin` table. All the data in the column will be lost.
  - You are about to drop the column `buyer_name` on the `Skin` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Skin" DROP COLUMN "buyer_id",
DROP COLUMN "buyer_name";
