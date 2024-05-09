/*
  Warnings:

  - The `processTransaction` column on the `TransactionHistory` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ProcessTransactionStatus" AS ENUM ('Default', 'Pending', 'Completed', 'Failed');

-- AlterTable
ALTER TABLE "TransactionHistory" DROP COLUMN "processTransaction",
ADD COLUMN     "processTransaction" "ProcessTransactionStatus" NOT NULL DEFAULT 'Default';
