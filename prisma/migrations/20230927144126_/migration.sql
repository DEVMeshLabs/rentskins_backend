/*
  Warnings:

  - You are about to drop the column `status_member` on the `Perfil` table. All the data in the column will be lost.
  - You are about to drop the column `sellerAt` on the `Skin` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Perfil" DROP COLUMN "status_member";

-- AlterTable
ALTER TABLE "Skin" DROP COLUMN "sellerAt",
ADD COLUMN     "saledAt" TIMESTAMP(3);
