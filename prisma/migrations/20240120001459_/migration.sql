/*
  Warnings:

  - You are about to drop the column `price_seller_total` on the `RentalTransaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "RentalTransaction" DROP COLUMN "price_seller_total",
ADD COLUMN     "seller_total_price" DOUBLE PRECISION;
