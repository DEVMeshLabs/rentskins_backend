/*
  Warnings:

  - Added the required column `rentalTransaction_id` to the `TransactionHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TransactionHistory" ADD COLUMN     "rentalTransaction_id" VARCHAR(255) NOT NULL;

-- AddForeignKey
ALTER TABLE "TransactionHistory" ADD CONSTRAINT "TransactionHistory_rentalTransaction_id_fkey" FOREIGN KEY ("rentalTransaction_id") REFERENCES "RentalTransaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
