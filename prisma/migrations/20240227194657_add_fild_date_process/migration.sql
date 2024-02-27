/*
  Warnings:

  - Added the required column `dateProcess` to the `TransactionHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TransactionHistory" ADD COLUMN     "dateProcess" TIMESTAMP(3) NOT NULL;
