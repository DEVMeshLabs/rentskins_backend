/*
  Warnings:

  - A unique constraint covering the columns `[owner_cpf]` on the table `Configuration` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Configuration_owner_cpf_key" ON "Configuration"("owner_cpf");
