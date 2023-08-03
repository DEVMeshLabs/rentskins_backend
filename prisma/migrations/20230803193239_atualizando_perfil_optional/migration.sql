-- AlterTable
ALTER TABLE "Perfil" ALTER COLUMN "status_member" DROP NOT NULL,
ALTER COLUMN "delivery_time" DROP NOT NULL,
ALTER COLUMN "delivery_fee" DROP NOT NULL,
ALTER COLUMN "total_exchanges" DROP NOT NULL;
