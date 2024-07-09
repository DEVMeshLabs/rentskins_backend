/*
  Warnings:

  - You are about to drop the column `buyer_id` on the `RentalTransaction` table. All the data in the column will be lost.
  - You are about to drop the column `days_quantity` on the `RentalTransaction` table. All the data in the column will be lost.
  - You are about to drop the column `end_date` on the `RentalTransaction` table. All the data in the column will be lost.
  - You are about to drop the column `fee_total_price` on the `RentalTransaction` table. All the data in the column will be lost.
  - You are about to drop the column `seller_id` on the `RentalTransaction` table. All the data in the column will be lost.
  - You are about to drop the column `skin_id` on the `RentalTransaction` table. All the data in the column will be lost.
  - You are about to drop the column `start_date` on the `RentalTransaction` table. All the data in the column will be lost.
  - You are about to drop the column `total_price` on the `RentalTransaction` table. All the data in the column will be lost.
  - The `status` column on the `RentalTransaction` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `buyerId` to the `RentalTransaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `daysQuantity` to the `RentalTransaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sellerId` to the `RentalTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RentalTransaction" DROP COLUMN "buyer_id",
DROP COLUMN "days_quantity",
DROP COLUMN "end_date",
DROP COLUMN "fee_total_price",
DROP COLUMN "seller_id",
DROP COLUMN "skin_id",
DROP COLUMN "start_date",
DROP COLUMN "total_price",
ADD COLUMN     "buyerId" VARCHAR(255) NOT NULL,
ADD COLUMN     "daysQuantity" VARCHAR(5) NOT NULL,
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "feePrice" DOUBLE PRECISION,
ADD COLUMN     "sellerId" VARCHAR(255) NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3),
ADD COLUMN     "totalGuarantee" DOUBLE PRECISION,
ADD COLUMN     "totalPriceRent" DOUBLE PRECISION,
DROP COLUMN "status",
ADD COLUMN     "status" "TransactionStatus" NOT NULL DEFAULT 'Default';

-- AlterTable
ALTER TABLE "Skin" ADD COLUMN     "rentalTransactionId" VARCHAR(36);

-- AddForeignKey
ALTER TABLE "Skin" ADD CONSTRAINT "Skin_rentalTransactionId_fkey" FOREIGN KEY ("rentalTransactionId") REFERENCES "RentalTransaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;
