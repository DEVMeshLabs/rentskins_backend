/*
  Warnings:

  - A unique constraint covering the columns `[owner_id]` on the table `Configuration` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Perfil" DROP CONSTRAINT "Perfil_configurationId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "Configuration_owner_id_key" ON "Configuration"("owner_id");

-- AddForeignKey
ALTER TABLE "Configuration" ADD CONSTRAINT "Configuration_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Perfil"("owner_id") ON DELETE CASCADE ON UPDATE CASCADE;
