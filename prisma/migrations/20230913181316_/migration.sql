/*
  Warnings:

  - You are about to drop the column `owner_name` on the `Notification` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[owner_id]` on the table `Perfil` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "owner_name";

-- CreateIndex
CREATE UNIQUE INDEX "Perfil_owner_id_key" ON "Perfil"("owner_id");
