-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_seller_id_fkey";

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "Perfil"("owner_id") ON DELETE RESTRICT ON UPDATE CASCADE;
