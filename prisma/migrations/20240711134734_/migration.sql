-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "rentalTransactionId" VARCHAR(36);

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_rentalTransactionId_fkey" FOREIGN KEY ("rentalTransactionId") REFERENCES "RentalTransaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;
