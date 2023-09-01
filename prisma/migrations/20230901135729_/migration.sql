/*
  Warnings:

  - A unique constraint covering the columns `[asset_id]` on the table `Skin` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Skin_asset_id_key" ON "Skin"("asset_id");
