/*
  Warnings:

  - You are about to drop the column `owner_email` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `owner_name` on the `Transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "owner_email",
DROP COLUMN "owner_name";
