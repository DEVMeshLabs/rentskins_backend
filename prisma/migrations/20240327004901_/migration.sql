-- DropForeignKey
ALTER TABLE "TransactionHistory" DROP CONSTRAINT "TransactionHistory_rentalTransaction_id_fkey";

-- DropForeignKey
ALTER TABLE "TransactionHistory" DROP CONSTRAINT "TransactionHistory_transaction_id_fkey";

-- AlterTable
ALTER TABLE "TransactionHistory" ALTER COLUMN "transaction_id" DROP NOT NULL,
ALTER COLUMN "rentalTransaction_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "TransactionHistory" ADD CONSTRAINT "TransactionHistory_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "Transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionHistory" ADD CONSTRAINT "TransactionHistory_rentalTransaction_id_fkey" FOREIGN KEY ("rentalTransaction_id") REFERENCES "RentalTransaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;
