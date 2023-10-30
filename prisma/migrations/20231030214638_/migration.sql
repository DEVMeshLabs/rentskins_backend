-- DropForeignKey
ALTER TABLE "Configuration" DROP CONSTRAINT "Configuration_owner_id_fkey";

-- AddForeignKey
ALTER TABLE "Perfil" ADD CONSTRAINT "Perfil_configurationId_fkey" FOREIGN KEY ("configurationId") REFERENCES "Configuration"("id") ON DELETE CASCADE ON UPDATE CASCADE;
