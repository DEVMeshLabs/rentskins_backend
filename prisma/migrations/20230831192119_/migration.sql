-- DropForeignKey
ALTER TABLE "SkinToCart" DROP CONSTRAINT "SkinToCart_cartId_fkey";

-- DropForeignKey
ALTER TABLE "SkinToCart" DROP CONSTRAINT "SkinToCart_skinId_fkey";

-- AddForeignKey
ALTER TABLE "SkinToCart" ADD CONSTRAINT "SkinToCart_skinId_fkey" FOREIGN KEY ("skinId") REFERENCES "Skin"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkinToCart" ADD CONSTRAINT "SkinToCart_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
