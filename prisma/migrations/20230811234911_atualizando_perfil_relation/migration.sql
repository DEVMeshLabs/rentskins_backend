/*
  Warnings:

  - Added the required column `owner_country` to the `Perfil` table without a default value. This is not possible if the table is not empty.
  - Added the required column `steam_url` to the `Perfil` table without a default value. This is not possible if the table is not empty.
  - Made the column `account_date` on table `Perfil` required. This step will fail if there are existing NULL values in that column.
  - Made the column `total_exchanges` on table `Perfil` required. This step will fail if there are existing NULL values in that column.
  - Made the column `steam_level` on table `Perfil` required. This step will fail if there are existing NULL values in that column.
  - Made the column `delivery_fee` on table `Perfil` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Perfil" ADD COLUMN     "configurationId" VARCHAR(36),
ADD COLUMN     "owner_country" VARCHAR(5) NOT NULL,
ADD COLUMN     "steam_url" VARCHAR(255) NOT NULL,
ALTER COLUMN "account_date" SET NOT NULL,
ALTER COLUMN "total_exchanges" SET NOT NULL,
ALTER COLUMN "steam_level" SET NOT NULL,
ALTER COLUMN "delivery_fee" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Perfil" ADD CONSTRAINT "Perfil_configurationId_fkey" FOREIGN KEY ("configurationId") REFERENCES "Configuration"("id") ON DELETE SET NULL ON UPDATE CASCADE;
