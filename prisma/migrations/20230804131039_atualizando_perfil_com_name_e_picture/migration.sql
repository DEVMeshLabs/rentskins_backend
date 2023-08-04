/*
  Warnings:

  - Added the required column `owner_name` to the `Perfil` table without a default value. This is not possible if the table is not empty.
  - Added the required column `picture` to the `Perfil` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Perfil" ADD COLUMN     "owner_name" VARCHAR(255) NOT NULL,
ADD COLUMN     "picture" VARCHAR(255) NOT NULL;
