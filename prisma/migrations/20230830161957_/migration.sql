/*
  Warnings:

  - You are about to drop the column `assent_id` on the `Skin` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[asset_id]` on the table `Skin` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `asset_id` to the `Skin` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SkinToCart" DROP CONSTRAINT "SkinToCart_cartId_fkey";

-- DropForeignKey
ALTER TABLE "SkinToCart" DROP CONSTRAINT "SkinToCart_skinId_fkey";

-- DropIndex
DROP INDEX "Skin_assent_id_key";

-- AlterTable
ALTER TABLE "Skin" DROP COLUMN "assent_id",
ADD COLUMN     "asset_id" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Skin_asset_id_key" ON "Skin"("asset_id");

-- AddForeignKey
ALTER TABLE "SkinToCart" ADD CONSTRAINT "SkinToCart_skinId_fkey" FOREIGN KEY ("skinId") REFERENCES "Skin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkinToCart" ADD CONSTRAINT "SkinToCart_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;
