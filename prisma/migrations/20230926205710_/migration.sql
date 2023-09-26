/*
  Warnings:

  - You are about to drop the column `confiabilidade` on the `Perfil` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Perfil" DROP COLUMN "confiabilidade",
ADD COLUMN     "reliability" VARCHAR(255) NOT NULL DEFAULT 'Sem informações';
