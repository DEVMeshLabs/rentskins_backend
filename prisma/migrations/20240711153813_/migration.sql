/*
  Warnings:

  - You are about to drop the column `skins` on the `TransactionHistory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Skin" ADD COLUMN     "transactionHistoryId" VARCHAR(36);

-- AlterTable
ALTER TABLE "TransactionHistory" DROP COLUMN "skins";

-- AddForeignKey
ALTER TABLE "Skin" ADD CONSTRAINT "Skin_transactionHistoryId_fkey" FOREIGN KEY ("transactionHistoryId") REFERENCES "TransactionHistory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
