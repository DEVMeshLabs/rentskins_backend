-- AlterTable
ALTER TABLE "PerfilInfo" ALTER COLUMN "status_member" DROP NOT NULL,
ALTER COLUMN "status_member" SET DEFAULT 'Membro novo',
ALTER COLUMN "delivery_time" DROP NOT NULL,
ALTER COLUMN "delivery_time" SET DEFAULT 'Sem informações no momento',
ALTER COLUMN "delivery_fee" DROP NOT NULL,
ALTER COLUMN "delivery_fee" SET DEFAULT 'Sem informações no momento',
ALTER COLUMN "total_exchanges" DROP NOT NULL,
ALTER COLUMN "total_exchanges" SET DEFAULT 'Sem informações no momento';
