/*
  Warnings:

  - You are about to drop the column `rentalTransactionId` on the `Skin` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Skin" DROP CONSTRAINT "Skin_rentalTransactionId_fkey";

-- AlterTable
ALTER TABLE "RentalTransaction" ADD COLUMN     "skins" JSONB[];

-- AlterTable
ALTER TABLE "Skin" DROP COLUMN "rentalTransactionId";
