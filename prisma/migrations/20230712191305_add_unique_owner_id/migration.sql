/*
  Warnings:

  - A unique constraint covering the columns `[owner_id]` on the table `Configuration` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Configuration_owner_id_key" ON "Configuration"("owner_id");
