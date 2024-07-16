/*
  Warnings:

  - You are about to alter the column `owner_id` on the `Notification` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "Notification" ALTER COLUMN "owner_id" SET NOT NULL,
ALTER COLUMN "owner_id" SET DATA TYPE VARCHAR(255);
