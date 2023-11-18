/*
  Warnings:

  - A unique constraint covering the columns `[buyer_id]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Cart_buyer_id_key" ON "Cart"("buyer_id");
