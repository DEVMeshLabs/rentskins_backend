-- CreateTable
CREATE TABLE "Transaction" (
    "id" VARCHAR(36) NOT NULL,
    "owner_id" VARCHAR(255) NOT NULL,
    "owner_name" VARCHAR(255) NOT NULL,
    "owner_email" VARCHAR(255) NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "payment_type" VARCHAR(255) NOT NULL,
    "installments" VARCHAR(255) NOT NULL,
    "total" VARCHAR(255) NOT NULL,
    "transaction_id" VARCHAR(255) NOT NULL,
    "processor_response" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);
