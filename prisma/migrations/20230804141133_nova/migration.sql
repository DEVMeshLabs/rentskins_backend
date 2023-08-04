/*
  Warnings:

  - You are about to drop the column `sellerId` on the `Skin` table. All the data in the column will be lost.
  - Added the required column `seller_id` to the `Skin` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Skin" DROP CONSTRAINT "Skin_sellerId_fkey";

-- AlterTable
ALTER TABLE "Skin" DROP COLUMN "sellerId",
ADD COLUMN     "seller_id" VARCHAR(255) NOT NULL;

-- AddForeignKey
ALTER TABLE "Skin" ADD CONSTRAINT "Skin_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
