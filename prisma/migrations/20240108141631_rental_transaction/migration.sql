-- CreateTable
CREATE TABLE "RentalTransaction" (
    "id" VARCHAR(36) NOT NULL,
    "owner_id" VARCHAR(255) NOT NULL,
    "skin_id" VARCHAR(255) NOT NULL,
    "total_price" DOUBLE PRECISION NOT NULL,
    "fee_total_price" DOUBLE PRECISION NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "RentalTransaction_pkey" PRIMARY KEY ("id")
);
