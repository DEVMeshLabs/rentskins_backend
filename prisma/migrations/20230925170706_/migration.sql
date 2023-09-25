/*
  Warnings:

  - Made the column `delivery_time` on table `Perfil` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Perfil" ALTER COLUMN "delivery_time" SET NOT NULL,
ALTER COLUMN "delivery_fee" SET DEFAULT 'Sem informações',
ALTER COLUMN "delivery_fee" SET DATA TYPE VARCHAR(255);
