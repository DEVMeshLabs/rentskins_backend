-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_seller_id_fkey";

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_skin_id_fkey" FOREIGN KEY ("skin_id") REFERENCES "Skin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
