/*
  Warnings:

  - Added the required column `balance` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "balance" VARCHAR(20) NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "Perfil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
