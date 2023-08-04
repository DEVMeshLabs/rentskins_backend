/*
  Warnings:

  - You are about to drop the column `cartId` on the `Skin` table. All the data in the column will be lost.
  - You are about to drop the column `seller_id` on the `Skin` table. All the data in the column will be lost.
  - Added the required column `sellerId` to the `Skin` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Skin" DROP CONSTRAINT "Skin_seller_id_fkey";

-- AlterTable
ALTER TABLE "Skin" DROP COLUMN "cartId",
DROP COLUMN "seller_id",
ADD COLUMN     "sellerId" VARCHAR(255) NOT NULL;

-- AddForeignKey
ALTER TABLE "Skin" ADD CONSTRAINT "Skin_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
