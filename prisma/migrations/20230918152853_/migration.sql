/*
  Warnings:

  - Changed the type of `skin_price` on the `Skin` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `balance` on the `Transaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Skin" DROP COLUMN "skin_price",
ADD COLUMN     "skin_price" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "balance",
ADD COLUMN     "balance" DOUBLE PRECISION NOT NULL;
