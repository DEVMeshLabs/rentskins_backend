-- AlterEnum
ALTER TYPE "TransactionStatus" ADD VALUE 'InProgress';

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "status" SET DEFAULT 'InProgress';
