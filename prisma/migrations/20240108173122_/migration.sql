-- AlterTable
ALTER TABLE "RentalTransaction" ALTER COLUMN "total_price" DROP NOT NULL,
ALTER COLUMN "fee_total_price" DROP NOT NULL;
