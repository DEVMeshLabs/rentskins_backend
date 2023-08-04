-- DropForeignKey
ALTER TABLE "Skin" DROP CONSTRAINT "Skin_seller_id_fkey";

-- AlterTable
ALTER TABLE "Skin" ALTER COLUMN "seller_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Skin" ADD CONSTRAINT "Skin_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "Cart"("id") ON DELETE SET NULL ON UPDATE CASCADE;
