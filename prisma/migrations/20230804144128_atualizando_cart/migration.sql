/*
  Warnings:

  - You are about to drop the column `buyer_name` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `seller_id` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `seller_name` on the `Cart` table. All the data in the column will be lost.
  - Made the column `seller_id` on table `Skin` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Skin" DROP CONSTRAINT "Skin_seller_id_fkey";

-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "buyer_name",
DROP COLUMN "seller_id",
DROP COLUMN "seller_name";

-- AlterTable
ALTER TABLE "Skin" ADD COLUMN     "cartId" TEXT,
ALTER COLUMN "seller_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Skin" ADD CONSTRAINT "Skin_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE SET NULL ON UPDATE CASCADE;
