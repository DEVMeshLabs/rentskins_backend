-- CreateTable
CREATE TABLE "RentalTransaction" (
    "id" VARCHAR(36) NOT NULL,
    "seller_id" VARCHAR(255) NOT NULL,
    "buyer_id" VARCHAR(255) NOT NULL,
    "skin_id" VARCHAR(255) NOT NULL,
    "total_price" DOUBLE PRECISION,
    "fee" VARCHAR(255),
    "fee_total_price" DOUBLE PRECISION,
    "days_quantity" VARCHAR(5) NOT NULL,
    "status" VARCHAR(255) DEFAULT 'Em andamento',
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "RentalTransaction_pkey" PRIMARY KEY ("id")
);
