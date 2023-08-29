/*
  Warnings:

  - A unique constraint covering the columns `[assent_id]` on the table `Skin` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Skin_assent_id_key" ON "Skin"("assent_id");
