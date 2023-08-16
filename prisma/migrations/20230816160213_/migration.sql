-- DropForeignKey
ALTER TABLE "Perfil" DROP CONSTRAINT "Perfil_configurationId_fkey";

-- DropIndex
DROP INDEX "Configuration_owner_id_key";

-- DropIndex
DROP INDEX "Perfil_owner_id_key";

-- AddForeignKey
ALTER TABLE "Perfil" ADD CONSTRAINT "Perfil_configurationId_fkey" FOREIGN KEY ("configurationId") REFERENCES "Configuration"("id") ON DELETE SET NULL ON UPDATE CASCADE;
