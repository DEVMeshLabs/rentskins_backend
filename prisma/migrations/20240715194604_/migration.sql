/*
  Warnings:

  - The `owner_id` column on the `Notification` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "owner_id",
ADD COLUMN     "owner_id" VARCHAR(255)[];
