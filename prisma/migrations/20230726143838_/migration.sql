/*
  Warnings:

  - Changed the type of `payment_type` on the `Transaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "payment_type",
ADD COLUMN     "payment_type" VARCHAR(255) NOT NULL;

-- DropEnum
DROP TYPE "Role";
