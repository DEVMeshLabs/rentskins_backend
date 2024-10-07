-- AddForeignKey
ALTER TABLE "WithdrawalRequest" ADD CONSTRAINT "WithdrawalRequest_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Wallet"("owner_id") ON DELETE RESTRICT ON UPDATE CASCADE;
