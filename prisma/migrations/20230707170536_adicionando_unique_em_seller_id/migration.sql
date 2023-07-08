/*
  Warnings:

  - A unique constraint covering the columns `[seller_id]` on the table `Skin` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Skin_seller_id_key" ON "Skin"("seller_id");
