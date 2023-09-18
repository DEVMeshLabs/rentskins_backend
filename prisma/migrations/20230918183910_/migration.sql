-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "buyer_confirm" DROP NOT NULL,
ALTER COLUMN "buyer_confirm" SET DEFAULT 'Pendente',
ALTER COLUMN "buyer_confirm" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "seller_confirm" DROP NOT NULL,
ALTER COLUMN "seller_confirm" SET DEFAULT 'Pendente',
ALTER COLUMN "seller_confirm" SET DATA TYPE VARCHAR(255);
