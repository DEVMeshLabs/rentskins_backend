-- CreateTable
CREATE TABLE "TransactionHistory" (
    "id" VARCHAR(36) NOT NULL,
    "transaction_id" VARCHAR(255) NOT NULL,
    "buyer_id" VARCHAR(255) NOT NULL,
    "seller_id" VARCHAR(255) NOT NULL,
    "processTransaction" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "TransactionHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TransactionHistory" ADD CONSTRAINT "TransactionHistory_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
