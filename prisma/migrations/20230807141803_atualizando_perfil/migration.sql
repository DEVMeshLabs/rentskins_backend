/*
  Warnings:

  - The `delivery_fee` column on the `Perfil` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Perfil" ALTER COLUMN "delivery_time" SET DEFAULT 'Sem informações',
DROP COLUMN "delivery_fee",
ADD COLUMN     "delivery_fee" INTEGER DEFAULT 0,
ALTER COLUMN "total_exchanges" DROP NOT NULL;
