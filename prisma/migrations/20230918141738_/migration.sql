-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "balance" DROP DEFAULT,
ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'Em andamento';
