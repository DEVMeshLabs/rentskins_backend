/*
  Warnings:

  - You are about to drop the `Configuration` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Perfil" DROP CONSTRAINT "Perfil_configurationId_fkey";

-- DropTable
DROP TABLE "Configuration";

-- CreateTable
CREATE TABLE "configuration" (
    "id" VARCHAR(36) NOT NULL,
    "owner_id" VARCHAR(255) NOT NULL,
    "owner_name" VARCHAR(255) NOT NULL,
    "owner_email" VARCHAR(255) NOT NULL,
    "owner_phone" VARCHAR(255) NOT NULL,
    "owner_cpf" VARCHAR(14) NOT NULL,
    "url_trade" VARCHAR(255) NOT NULL,
    "url_sell" VARCHAR(255) NOT NULL,
    "agreed_with_emails" BOOLEAN DEFAULT false,
    "agreed_with_terms" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "configuration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "configuration_owner_id_key" ON "configuration"("owner_id");

-- AddForeignKey
ALTER TABLE "Perfil" ADD CONSTRAINT "Perfil_configurationId_fkey" FOREIGN KEY ("configurationId") REFERENCES "configuration"("id") ON DELETE CASCADE ON UPDATE CASCADE;
