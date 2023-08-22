/*
  Warnings:

  - Added the required column `owner_cpf` to the `Configuration` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Configuration" ADD COLUMN     "owner_cpf" VARCHAR(14) NOT NULL;
