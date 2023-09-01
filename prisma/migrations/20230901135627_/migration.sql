-- DropForeignKey
ALTER TABLE "SkinToCart" DROP CONSTRAINT "SkinToCart_cartId_fkey";

-- DropForeignKey
ALTER TABLE "SkinToCart" DROP CONSTRAINT "SkinToCart_skinId_fkey";

-- DropIndex
DROP INDEX "Skin_asset_id_key";

-- AddForeignKey
ALTER TABLE "SkinToCart" ADD CONSTRAINT "SkinToCart_skinId_fkey" FOREIGN KEY ("skinId") REFERENCES "Skin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkinToCart" ADD CONSTRAINT "SkinToCart_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
