/*
  Warnings:

  - You are about to drop the column `status_atividade` on the `Perfil` table. All the data in the column will be lost.
  - You are about to drop the column `steam_create` on the `Perfil` table. All the data in the column will be lost.
  - Added the required column `steam_created_date` to the `Perfil` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Perfil" DROP COLUMN "status_atividade",
DROP COLUMN "steam_create",
ADD COLUMN     "account_status" VARCHAR(20) NOT NULL DEFAULT 'Ativo',
ADD COLUMN     "steam_created_date" TIMESTAMP(3) NOT NULL;
