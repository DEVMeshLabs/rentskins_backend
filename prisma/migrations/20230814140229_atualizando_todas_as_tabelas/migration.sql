/*
  Warnings:

  - A unique constraint covering the columns `[owner_id]` on the table `Configuration` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[owner_id]` on the table `Notification` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[owner_id]` on the table `Perfil` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[owner_id]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[owner_id]` on the table `Wallet` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Perfil" DROP CONSTRAINT "Perfil_configurationId_fkey";

-- AlterTable
ALTER TABLE "Perfil" ALTER COLUMN "status_atividade" SET DEFAULT 'Ativo';

-- CreateIndex
CREATE UNIQUE INDEX "Configuration_owner_id_key" ON "Configuration"("owner_id");

-- CreateIndex
CREATE UNIQUE INDEX "Notification_owner_id_key" ON "Notification"("owner_id");

-- CreateIndex
CREATE UNIQUE INDEX "Perfil_owner_id_key" ON "Perfil"("owner_id");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_owner_id_key" ON "Transaction"("owner_id");

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_owner_id_key" ON "Wallet"("owner_id");

-- AddForeignKey
ALTER TABLE "Perfil" ADD CONSTRAINT "Perfil_configurationId_fkey" FOREIGN KEY ("configurationId") REFERENCES "Configuration"("owner_id") ON DELETE SET NULL ON UPDATE CASCADE;
