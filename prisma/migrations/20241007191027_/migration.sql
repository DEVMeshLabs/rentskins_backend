-- DropForeignKey
ALTER TABLE "WithdrawalRequest" DROP CONSTRAINT "WithdrawalRequest_owner_id_fkey";

-- AlterTable
ALTER TABLE "WithdrawalRequest" ADD COLUMN     "wallet_id" VARCHAR(255);

-- AddForeignKey
ALTER TABLE "WithdrawalRequest" ADD CONSTRAINT "WithdrawalRequest_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "Wallet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
