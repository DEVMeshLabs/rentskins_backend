/*
  Warnings:

  - Added the required column `status_atividade` to the `Perfil` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Perfil" ADD COLUMN     "status_atividade" VARCHAR(20) NOT NULL;
