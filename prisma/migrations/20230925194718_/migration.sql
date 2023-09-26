/*
  Warnings:

  - You are about to drop the column `delivery_fee` on the `Perfil` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Perfil" DROP COLUMN "delivery_fee",
ADD COLUMN     "confiabilidade" VARCHAR(255) NOT NULL DEFAULT 'Sem informações';
