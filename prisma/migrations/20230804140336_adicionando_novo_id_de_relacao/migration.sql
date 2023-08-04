-- DropForeignKey
ALTER TABLE "Skin" DROP CONSTRAINT "Skin_cartId_fkey";

-- AddForeignKey
ALTER TABLE "Skin" ADD CONSTRAINT "Skin_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
